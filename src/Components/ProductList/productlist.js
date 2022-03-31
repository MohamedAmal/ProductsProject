import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios'
import ProductCard from './productcard'
class ProductList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { products: [], massDelete: [] }

  }
  componentDidMount() {
    console.log('commstate', this.props.commState)
    // const url = 'http://localhost/index.php/'
    const url = 'https://productsproject.000webhostapp.com/public_html/index.html/'

    axios.get(url).then(response => response.data).then(data => {
      const dvd = data.filter(obj => obj.Type == 'DVD');
      const furniture = data.filter(obj => obj.Type == 'Furniture');
      const book = data.filter(obj => obj.Type == 'Book');
      const viewProducts = [...dvd, ...furniture, ...book]
      this.setState({ products: viewProducts })
    }).catch(function (response) {
      // handle error
      console.log('error', response)
    });
  }
  componentDidUpdate() {
    // const url = 'http://localhost/index.php/'
    const url = 'https://productsproject.000webhostapp.com/public_html/index.html/'
      axios.get(url).then(response => response.data).then(data => {
        const dvd = data.filter(obj => obj.Type == 'DVD');
        const furniture = data.filter(obj => obj.Type == 'Furniture');
        const book = data.filter(obj => obj.Type == 'Book');
        const viewProducts = [...dvd, ...furniture, ...book]
        this.setState({ products: viewProducts })
      }).catch(function (response) {
        //handle error
        console.log('error', response)
      });
  }

  handleDelete = event => {
    event.preventDefault()
    axios({
      method: 'DELETE',
      // url: 'http://localhost/index.php/?delete=' + this.state.massDelete.join(),
      url: 'https://productsproject.000webhostapp.com/public_html/index.html/?delete=' + this.state.massDelete.join(),

      config: { headers: { 'Content-Type': 'application/json' } }
    })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (response) {
        console.log(response)
      });
    this.setState({ massDelete: [] })
  }

  updateState(toggleData) {
    let tempArr = this.state.massDelete
    if (toggleData.isChecked == true) {
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
          <h2>Product List </h2>
          {this.props.commState.toString()}
          <div className='d-flex justify-content-between'>
            <Link to='/addproduct' className='btn btn-primary m-2'>
              Add
            </Link>
            <button
              id='delete-product-btn'
              type='button'
              className='btn btn-success m-2'
              onClick={e => this.handleDelete(e)}
            >
              Mass Delete
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
