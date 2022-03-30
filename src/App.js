import './App.css';
import React from 'react';
import { Routes, Route, Link, Navigate } from "react-router-dom";
import ParentComponent from './ParentComponent/parentcomponent'
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.js";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
class App extends React.Component {
  render() {
    return (
      <ParentComponent/>

      // < main>
      //   <div className="container">
      //     <Routes>
      //       <Route exact path='/' element={<ParentComponent />} />
      //       <Route path='/addproduct' element={<ProductAdd />} />
      //     </Routes>
      //   </div>
      // </main>
    );
  }
}
export default App;