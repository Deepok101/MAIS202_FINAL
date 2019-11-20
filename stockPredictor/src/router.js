import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import MainPage from './mainpage/mainpage'
import StockPage from './stocks/stockPage'
import AppleResults from './results/results'
import HomePage from './homepage/home'

export default function App() {
  return (
    <Router>
          <Route path="/" exact component={MainPage}/>
          <Route path="/stock/apple" component={() => <StockPage default="apple"/>}/>
          <Route path="/stock/goldman" component={() => <StockPage default="goldman"/>}/>

          <Route path="/predictions" component={AppleResults}/>
    </Router>
  );
}