import React from 'react'
import { Routes, Route } from "react-router-dom";
import ProductList from '../Components/ProductList/productlist';
import ProductAdd from '../Components/ProductAdd/productadd';
class ParentComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = { commState: false, updateList: null }
  }
  componentDidUpdate() {
  }

  updateState(state) {
    this.setState({
      commState: state
    })
  }
  render() {
    return (
      < main>
        <div className="container">
          <Routes>
            <Route path='/' element={<ProductList commState={this.state.commState} />} />
            <Route path='/addproduct' element={<ProductAdd stateCommFunc={e => this.updateState(e)} />} />
          </Routes>
        </div>
      </main>
    )
  }
}
export default ParentComponent
