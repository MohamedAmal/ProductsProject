import React from 'react'
import { Link, Navigate } from "react-router-dom";
import axios from 'axios'

import ProductCard from './productcard'
class ProductList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { products: [], massDelete: [], deleteAction: false }
    // this.deleteAction = false
  }
  async componentDidMount() {
    // const url = 'http://localhost/index.php/'  // local
    const url = 'http://productsproject.atwebpages.com/index.php/' // remote awardspace
    await axios.get(url).then(response => response.data).then(data => {
      // if (data.length > 0) {
      console.log('retreive mount data', data)
      const dvd = data.filter(obj => obj.Type == 'DVD');
      const furniture = data.filter(obj => obj.Type == 'Furniture');
      const book = data.filter(obj => obj.Type == 'Book');
      const viewProducts = [...dvd, ...furniture, ...book]
      this.setState({ products: viewProducts })
      // }
    }).catch(function (response) {
      console.log('error', response)
    });
  }

  shouldComponentUpdate() {
    console.log('should update')
    return true
  }

  async componentDidUpdate() {
    if (this.state.deleteAction == true) {
      console.log('deleteAction', this.state.deleteAction)
      // const url = 'http://localhost/index.php/'  // local
      const url = 'http://productsproject.atwebpages.com/index.php/' // remote awardspace
      await axios.get(url).then(response => response.data).then(data => {
        // if (data.length > 0) {
        console.log('retreive update data', data)
        const dvd = data.filter(obj => obj.Type == 'DVD');
        const furniture = data.filter(obj => obj.Type == 'Furniture');
        const book = data.filter(obj => obj.Type == 'Book');
        const viewProducts = [...dvd, ...furniture, ...book]
        this.setState({ products: viewProducts })
        // }
      }).catch(function (response) {
        console.log('error', response)
      });
      this.state.deleteAction = false
    }
  }


  async handleDelete(e) {
    // e.preventDefault();
    // this.deleteAction = true
    console.log(this.state.massDelete)
    if (this.state.massDelete.length > 0) {
      await axios({
        method: 'DELETE',
        // url: 'http://localhost/index.php/?delete=' + this.state.massDelete.join(),   // local
        url: 'http://productsproject.atwebpages.com/index.php/?delete=' + this.state.massDelete.join(), // remote awardspace
        config: { headers: { 'Content-Type': 'application/json' } }
      }).then(function (response) { console.log(response) }).catch(function (response) { console.log(response) });

      // window.location.reload(true)
      this.setState({ deleteAction: true })
    }
  }

  updateState(toggleData) {
    let tempArr = this.state.massDelete
    if (toggleData.isChecked === true) {
      tempArr = tempArr.concat(toggleData.id)
      this.setState({ massDelete: tempArr })
    } else {
      tempArr = tempArr.filter(e => e != toggleData.id)
      this.setState({ massDelete: tempArr })
    }
  }

  render() {
    return (
      <div className="container">
        <div className='d-flex justify-content-between mt-4 mx-3 p-0'>
          <h2>Product List</h2>
          <p>{this.props.commState.toString()}</p>
          <p>{this.props.massDelete}</p>

          <div className='d-flex justify-content-between'>
            <Link to='/addproduct' className='btn btn-primary m-2'>
              ADD
            </Link>
            <button
              id='delete-product-btn'
              type='button'
              className='btn btn-success m-2'
              onClick={e => this.handleDelete(e)}
            >
              MASS DELETE
            </button>
          </div>
        </div>
        <hr className='mx-3'></hr>

        <div className='row d-flex flex-row flex-wrap justify-content-start p-0 m-0'>
          {this.state.products.map((item, key) => {
            return (
              <ProductCard
                key={key}
                id_db={item.id}
                sku={item.SKU}
                pname={item.Name}
                type={item.Type}
                commFunc={e => this.updateState(e)}
              />
            )
          })}
        </div>
      </div>
    )
  }
}
export default ProductList
