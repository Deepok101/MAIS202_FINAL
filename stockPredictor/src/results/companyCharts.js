import React from 'react'
import Nav from '../common/navbar'
import * as V from 'victory';
import { VictoryVoronoiContainer, VictoryChart, VictoryZoomContainer, VictoryTooltip, VictoryLine, VictoryBrushContainer, VictoryAxis } from 'victory';
import ReactTable from "react-table";
import "react-table/react-table.css";
import Button from 'react-bootstrap/Button'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'



class AppleChart extends React.Component{
    constructor() {
        super();
        this.state = {
          zoomDomain: { x: [new Date(2003, 1, 1), new Date(2011, 1, 1)] },
          data: [],
          formatedData:[],
          unformatedData:[],
          prediction: [],
          news:[],
          section: "stock"
        };
      }
    
    handleZoom(domain) {
        this.setState({ zoomDomain: domain });
    }
    handleData(stock){
        fetch(`/stock/${stock}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(data => this.setState({data: data})).then(() => this.transformData())
    }
    fetchPredictions(stock){
      fetch(`/prediction/${stock}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json()).then(prediction => this.setState({prediction: prediction}))
    }

    fetchNews(stock){
      fetch(`/news/${stock}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json()).then(news => this.setState({news: news}))
    }


    transformData(){
      var dataFormated=[]
      var unformatedData=[]
      var data = this.state.data
      if(this.props.stock == "apple"){
        for(var i=5000; i<8300; i++){
          if(data[i].Close != null){
            dataFormated.push({a: new Date(data[i].Date), b: parseFloat(data[i].Close)})
          }
        }
        for(var i=5000; i<8300; i++){
          if(data[i].Close != null){
            unformatedData.push({Date: data[i].Date, Close: parseFloat(data[i].Close)})
          }
        }
      } else {
        for(var i=1000; i<3800; i++){
          if(data[i].Close != null){
            dataFormated.push({a: new Date(data[i].Date), b: parseFloat(data[i].Close)})
          }
        }
        for(var i=1000; i<3800; i++){
          if(data[i].Close != null){
            unformatedData.push({Date: data[i].Date, Close: parseFloat(data[i].Close)})
          }
        }
      }

      this.setState({formatedData: dataFormated, unformatedData: unformatedData})
    }

    componentDidMount(){
      this.handleData(this.props.stock)
      this.fetchPredictions(this.props.stock)
      this.fetchNews(this.props.stock)
    }

    render() {
        console.log(this.state.formatedData)
        if(this.state.formatedData){
          var data = this.state.formatedData
          var prediction = this.state.prediction
          var news = this.state.news
          const buttons = 
                <div>
                  <ToggleButtonGroup type="radio" name="options" defaultValue={1} toggle className="mt-3 mb-3" style={{width: '100%'}}>
                    <ToggleButton type="radio" name="radio" defaultChecked value="1" onClick={()=> this.setState({section:"stock"})}>
                      Stock
                    </ToggleButton>
                    <ToggleButton type="radio" name="radio" value="2" onClick={()=> this.setState({section:"prediction_headlines"})}>
                      Headlines
                    </ToggleButton>
                    <ToggleButton type="radio" name="radio" value="3" onClick={()=> this.setState({section:"predictions"})}>
                      Prediction
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>
          var section;
          
          if(this.state.section == "stock"){
            section =  (
              <div>
              <VictoryChart width={600} height={470} scale={{ x: "time" }}
                  containerComponent={
                    <VictoryVoronoiContainer
                    
                    labels={({ datum }) => `${(`${datum._x.getFullYear()}-${datum._x.getMonth()}-${datum._x.getDate()}`)}, $${(datum._y)}`}
                    labelComponent={
                        <VictoryTooltip
                        cornerRadius={0}
                        flyoutStyle={{ fill: "white" }}
                        />}
                    />
                  }
                >
                  <VictoryAxis
                    dependentAxis label="Price"
                  />
                  <VictoryAxis
                    label="Time"
                  />
                  <VictoryLine
                    style={{
                      data: { stroke: "tomato" }
                    }}
                    data={
                      data
                    }
                    x="a"
                    y="b"
                  />
      
                </VictoryChart>
                <VictoryChart width={600} height={470} scale={{ x: "time" }}
                  containerComponent={
                    <VictoryZoomContainer
                      zoomDimension="x"
                      zoomDomain={this.state.zoomDomain}
                      onZoomDomainChange={this.handleZoom.bind(this)}

                    />
                  }
                  >
                    <VictoryAxis
                      dependentAxis label="Price"
                    />
                    <VictoryAxis
                      label="Time"
                    />
                    <VictoryLine
                      style={{
                        data: { stroke: "blue" }
                      }}
                      data={
                        data
                      }
                      x="a"
                      y="b"
                    />
        
                  </VictoryChart>
                  <VictoryChart
                    padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
                    width={600} height={100} scale={{ x: "time" }}
                    containerComponent={
                      <VictoryBrushContainer
                        brushDimension="x"
                        brushDomain={this.state.zoomDomain}
                        onBrushDomainChange={this.handleZoom.bind(this)}
                      />
                    }
                    
                  >
                    <VictoryAxis
                      tickFormat={(x) => new Date(x).getFullYear()}
                    />
                    <VictoryLine
                      style={{
                        data: { stroke: "blue" }
                      }}
                      data={data}
                      x="a"
                      y="b"
                    />
                  </VictoryChart>
              </div>
            );
                   
          }
          if(this.state.section == "predictions"){
            section = (
              <div>
                <ReactTable 
                    data={prediction}
                    columns={[
                      {Header: "Date", accessor: 'Date'},
                      {Header: "Open", accessor: 'Open'},
                      {Header: "Close", accessor: 'Close'},
                      {Header: "Change", accessor: 'Change'},
                      {Header: "Prediction", accessor: 'Prediction'},
                    ]}
                />
              </div>
            )
          }
          if(this.state.section == "prediction_headlines"){
            section = (
              <div>
                    <ReactTable 
                    data={news}
                    columns={[
                      {Header: "Date", 
                      accessor: 'Date', 
                      width: 140,
                      Cell: row => (
                        <div style={{ textAlign: "left" }}>{row.value}</div>
                        ) 
                      },
                      {Header: "Headline", 
                      accessor: 'headline_text',
                      Cell: row => (
                        <div style={{ textAlign: "left" }}>{row.value}</div>
                        ) 
                      },
                    ]}
                    />
              </div>
            )
          }
          return(
            <div>
              {buttons}
              {section}
            </div>

          )
        }

      }
}

export default AppleChart