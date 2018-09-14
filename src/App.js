import React, { Component } from 'react';
import logo from './logo.svg';
import StressBuster from './component/StressBuster';
import './App.css';

let maxCount = 3;
class App extends Component {

  render() {
    console.log('Hi,I am in App.js render');
    maxCount = maxCount + 1;
    return (
      <div className="App">
        <header className="App-header">
          <h5 className="App-title">Sample Code React</h5>
        </header>
        <p className="App-intro">
              <StressBuster maxCount={maxCount}/>
        </p>
      </div>
    );
  }
}

export default App;
