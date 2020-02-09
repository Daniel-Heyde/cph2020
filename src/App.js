import React, {Component} from 'react';
import logo from './assets/logo.svg';
import MenuBar from './components/MenuBar'
import QuestionsTabs from './components/QuestionsTabs'
import './css/App.css';

class App extends Component {
  render() {
      return (
        <div>
          <MenuBar />
          <QuestionsTabs />
        </div>
      )
  }
}

export default App;
