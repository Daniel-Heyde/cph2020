import React, {Component} from 'react';
import logo from './assets/logo.svg';
import MenuBar from './components/MenuBar'
import HorizontalLabelPositionBelowStepper from './components/Questions'
import './css/App.css';

class App extends Component {
  render() {
      return (
        <div>
          <MenuBar />
          <HorizontalLabelPositionBelowStepper />
        </div>
      )
  }
}

export default App;
