import React from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './mainpage/mainpage'
import 'bootstrap/dist/css/bootstrap.min.css';
import Router from './router'
function App() {
  return (
    <div className="App">
      <Router/>
    </div>
  );
}

export default App;
