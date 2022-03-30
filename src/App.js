import './App.css';
import React from 'react';
import ParentComponent from './ParentComponent/parentcomponent'
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.js";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
class App extends React.Component {
  render() {
    return (
      <ParentComponent/>
    );
  }
}
export default App;