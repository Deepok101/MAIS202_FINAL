from flask import Flask, render_template, request, jsonify
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn import svm

app = Flask(__name__)

AAPL = pd.read_csv('AAPL.csv')
GS = pd.read_csv("GS.csv")
AAPL_mod = pd.read_csv('AAPL.csv', names=['Date', 'Open', 'High', 'Low', 'Close', 'Adj Close', 'Volume'])
class stockPredictor:
    def __init__(self, stock, stock_csv, news, rmDuplicates, date, stockName):
        self.stock = stock
        self.stock_csv = stock_csv,
        self.news = news
        self.removeDuplicates = rmDuplicates
        self.date = date
        self.stockName = stockName
    def exportStockJSON(self):
        print(self.stock_csv)
        df = pd.read_csv((self.stock_csv)[0], names=['Date', 'Open', 'High', 'Low', 'Close', 'Adj Close', 'Volume'])
        df = df.iloc[1:]
        df['Change'] = df['Open'].astype(float) - df['Close'].astype(float)
        # date = df['Date']
        # close = df['Close']
        export = pd.DataFrame(df)
        return(export.to_json(orient='records'))        
    def compileNews(self):
        headlines = self.news
        headlines.columns = ['Website', 'Date', 'headline_text', 'Source']
        headlines.Date = pd.to_datetime(headlines.Date)
        headlines.Date = headlines['Date'].dt.strftime('%Y-%m-%d')
        headlines.Date = pd.to_datetime(headlines.Date)
        return(headlines)
    def compileData(self):
        stock = self.stock
        headlines = self.compileNews()
        stock['Date'] = pd.to_datetime(stock['Date'], format='%Y-%m-%d')
        stock['Average'] = (stock.High+stock.Low)/2
        self.stock = stock;
        mergedData = pd.merge(stock, headlines, how='inner', on='Date')
        mergedData = mergedData.drop(columns=['Source', 'Website'])

        dummy = mergedData.groupby("Date").mean().diff()['Close']
        dummy[dummy > 0] = 1
        dummy[dummy < 0] = 0
        dummy = dummy.rename("Change")
        mergedData = mergedData.merge(dummy, how='inner', on='Date').dropna()
        return(mergedData)
    def filter_news(self, data):
        #To be modified
        if(self.stockName == 'apple'):
            filter = data[(data['headline_text'].str.contains("Apple|Foxconn|iPhone|iPad"))]
        elif(self.stockName == 'goldman'):
            filter = data[(data['headline_text'].str.contains("Goldman"))]

        if(self.removeDuplicates==False):
            return(filter)
        else: 
            filter = filter.drop_duplicates(subset='Date', keep='last')
        return(filter)

    def compile_filter(self):
        return(self.filter_news(self.compileData()))
    def training_data(self):
        data = self.compile_filter()
        train = data[data.Date <= self.date]
        test = data[data.Date > self.date]

        self.train = train
        self.test = test

        X_train = train.headline_text
        y_train = train.Change
        X_test = test.headline_text
        y_test = test.Change

        vectorizer = CountVectorizer(binary=False, stop_words='english')

        train_data = vectorizer.fit_transform(X_train)
        test_data = vectorizer.transform(X_test)
        train_labels = y_train
        test_labels = y_test
        #SVC
        if(self.stockName == "apple"):
            clf = svm.SVC(gamma='scale', kernel='poly', degree=1)
        elif(self.stockName == "goldman"):
            clf = svm.SVC(gamma='scale', kernel='poly', degree=3)
        clf.fit(train_data, train_labels)
        y_pred_train = clf.predict(train_data)
        y_pred_test = clf.predict(test_data)
        return([y_pred_train, y_pred_test])
    def test_predictions(self):
        data = self.compile_filter()

        test = data[data.Date > self.date]

        test['Prediction'] = self.training_data()[1]

        daily_test = test.groupby('Date').mean()
        daily_test['Prediction'][daily_test['Prediction'] < 0.5] = 0
        daily_test['Prediction'][daily_test['Prediction'] >= 0.5] = 1
        daily_test = daily_test.reset_index()

        #Stringify dates as readable format
        daily_test['Date'] = daily_test['Date'].dt.strftime('%Y-%m-%d')
        test['Date'] = test['Date'].dt.strftime('%Y-%m-%d')
        return([test, daily_test])
    def profits_close_close_active(self, typeInvestment):
        test_predictions = self.test_predictions()
        
        daily_test = test_predictions[1]
        test_pred = test_predictions[0]
       
        test_pred['Date'] = pd.to_datetime(test_pred['Date'], format="%Y-%m-%d")

        stock_test = self.stock[self.stock.Date > self.date]
        stock_test['Profit_Passive'] = stock_test['Close'].diff()
        daily_test = stock_test.merge(test_pred)

        arr=[]
        for index, row in daily_test.iterrows():
            if(row.Prediction == 0):
                arr.append((-row.Profit_Passive))
            if(row.Prediction == 1):
                arr.append((row.Profit_Passive))
        daily_test['Profit_Active'] = arr


        return(daily_test)
        


def financialNews():
    finance_headlines = pd.read_csv("news.csv")
    finance_headlines.columns = ['Website', 'Date', 'headline_text', 'Source']
    finance_headlines.Date = pd.to_datetime(finance_headlines.Date)
    finance_headlines.Date = finance_headlines['Date'].dt.strftime('%Y-%m-%d')
    finance_headlines.Date = pd.to_datetime(finance_headlines.Date)
    return(finance_headlines)

# data = filterApple(compileData(AAPL))
# data_filtered = filterAppleNoRep()

# testing_date = data[data.Date > '2013-08-10']
# training_date = data[data.Date <= '2013-08-10']

def trainData(train, test):
    X_train = train.headline_text
    y_train = train.Change
    X_test = test.headline_text
    y_test = test.Change

    vectorizer = CountVectorizer(binary=False, stop_words='english')

    train_data = vectorizer.fit_transform(X_train)
    test_data = vectorizer.transform(X_test)
    train_labels = y_train
    test_labels = y_test
    #SVC
    clf = svm.SVC(gamma='scale', kernel='poly', degree=3)
    clf.fit(train_data, train_labels)
    y_pred_train = clf.predict(train_data)
    y_pred_test = clf.predict(test_data)
    return([y_pred_train, y_pred_test])

#Predictions
def prediction(y_pred_test, test_date):
    test = test_date
    test['Prediction'] = y_pred_test

    daily_test = test.groupby('Date').mean()
    daily_test['Prediction'][daily_test['Prediction'] < 0.5] = 0
    daily_test['Prediction'][daily_test['Prediction'] >= 0.5] = 1
    daily_test = daily_test.reset_index()

    #Stringify dates as readable format
    test['Date'] = test['Date'].dt.strftime('%Y-%m-%d')
    return([test, daily_test])


# y_pred_train_cvm = trainData(training_date, testing_date)[0]
# y_pred_test_cvm = trainData(training_date, testing_date)[1]
# test_predictions = prediction(y_pred_test_cvm, testing_date)[0]
# daily_predictions = prediction(y_pred_test_cvm, testing_date)[1]

# data['Date'] = data['Date'].dt.strftime('%Y-%m-%d')

apple = stockPredictor(AAPL, 'AAPL.csv', financialNews(), True, '2013-08-10', 'apple')
gs = stockPredictor(GS, 'GS.csv', financialNews(), True, '2013-08-10', 'goldman')

apple_model = apple.test_predictions()
gs_model = gs.test_predictions()

# print(apple.profits_close_close_active())

@app.route("/", methods=['GET'])
def hello():
    return("HEllo")

@app.route('/stock/apple', methods=['GET'])
def appleStock():
    return(apple.exportStockJSON())

@app.route('/stock/goldman', methods=['GET'])
def goldmanStock():
    return(gs.exportStockJSON())

@app.route('/news/apple', methods=['GET'])
def appleNews():
    return(apple_model[0].to_json(orient='records'))

@app.route('/news/goldman', methods=['GET'])
def goldmanNews():
    return(gs_model[0].to_json(orient='records'))

@app.route("/prediction/apple", methods=['GET'])
def applePred():
    return(apple_model[1].to_json(orient='records'))

@app.route("/prediction/goldman", methods=['GET'])
def goldmanPred():
    return(gs_model[1].to_json(orient='records'))

@app.route('/game/prediction/apple', methods=['POST'])
def appleGamePred():
    numShares = request.get_json()['numShares']
    typeInvest = request.get_json()['typeInvestment']

    data = apple.profits_close_close_active(typeInvest)

    data['Profit_Active_Total'] = apple.profits_close_close_active(typeInvest)['Profit_Active']*int(numShares)
    data['Profit_Passive_Total'] = apple.profits_close_close_active(typeInvest)['Profit_Passive']*int(numShares)
    data['Profit_Active_CumSum_Total'] = data['Profit_Active_Total'].cumsum()
    data['Profit_Passive_CumSum_Total'] = data['Profit_Passive_Total'].cumsum()

    data['Date'] = data['Date'].dt.strftime('%Y-%m-%d')

    return(data.to_json(orient='records'))

@app.route('/game/prediction/goldman', methods=['POST'])
def goldmanGamePred():
    numShares = request.get_json()['numShares']
    typeInvest = request.get_json()['typeInvestment']

    data = gs.profits_close_close_active(typeInvest)

    data['Profit_Active_Total'] = gs.profits_close_close_active(typeInvest)['Profit_Active']*int(numShares)
    data['Profit_Passive_Total'] = gs.profits_close_close_active(typeInvest)['Profit_Passive']*int(numShares)
    data['Profit_Active_CumSum_Total'] = data['Profit_Active_Total'].cumsum()
    data['Profit_Passive_CumSum_Total'] = data['Profit_Passive_Total'].cumsum()

    data['Date'] = data['Date'].dt.strftime('%Y-%m-%d')

    return(data.to_json(orient='records'))

    



if __name__ == '__main__':
    app.run()