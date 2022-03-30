import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
class ProductAdd extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.state = {
      sku: null, name: null, price: null, size: null,
      height: null, width: null, length: null, weight: null, dropDownSelection: 'DVD',
      redirect: false 
    };
  }
  // componentDidUpdate() {
  //   if(this.state.redirect){
  //   }
  // }
  handleChange(event) {
    const state = this.state
    state[event.target.name] = event.target.value
    this.setState(state);
  }
  handleToggle(e) {
    const state = this.state
    state.dropDownSelection = e.target.name
    this.setState(state);
    console.log(e.target.name)
    console.log('state', this.state)
    switch (state.dropDownSelection) {
      case 'DVD':
        state.height = null
        state.width = null
        state.length = null
        state.weight = null
        break;
      case 'Furniture':
        state.size = null
        state.weight = null
        break;
      case 'Book':
        state.size = null
        state.height = null
        state.width = null
        state.length = null
        break;
    }
  }
  async handleSubmit(event) {
    event.preventDefault();
    let formData = new FormData();

    formData.append('sku', this.state.sku)
    formData.append('name', this.state.name)
    formData.append('price', this.state.price)
    formData.append('type', this.state.dropDownSelection)
    formData.append('size', this.state.size)
    formData.append('height', this.state.height)
    formData.append('width', this.state.width)
    formData.append('length', this.state.length)
    formData.append('weight', this.state.weight)
    // console.log(...formData.entries())

    await axios({
      method: 'POST',
      url: 'http://localhost/index.php/',
      data: formData,
      config: { headers: { 'Content-Type': 'multipart/form-data' } }
    })
      .then(function (response) {
        // handle success
      })
      .catch(function (response) {
        //handle error
        // console.log(response)
      });
    setTimeout(() => {
      this.setState({
        redirect: true
      })
      const redirect = true
      this.props.stateCommFunc(redirect)        
    }, 0);
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to="/" state={{ msg: 'dd' }}  />; 
    }
    else {
      return (
        <div className="container">
          <div className='d-flex justify-content-between mt-4 mx-3 p-0'>
            <h2>Product Add</h2>
            <div className='d-flex justify-content-between'>
              <form onSubmit={this.handleSubmit} id='product_form'>
                <button type="submit" className="btn btn-primary m-2" value="save">Save</button>

                <Link to="/" className="btn btn-success m-2">Cancel</Link>
              </form>
            </div>
          </div>
          <hr className='mx-3'></hr>
          <div className='row col-7 d-flex flex-row justify-content-start mx-1'>
            <form onSubmit={this.handleSubmit}>

              <div className="row ">
                <label for="colFormLabelLg" className="col-sm-2 col-form-label col-form-label">SKU</label>
                <div className="col-sm-5">
                  <input type="text" className="form-control form-control" id="sku" name='sku' onChange={this.handleChange} />
                </div>
              </div>
              <div className="row py-2">
                <label for="colFormLabelLg" className="col-sm-2 col-form-label col-form-label">Name</label>
                <div className="col-sm-5">
                  <input type="text" className="form-control form-control" id="name" name='name' onChange={this.handleChange} />
                </div>
              </div>
              <div className="row">
                <label for="colFormLabelLg" className="col-sm-2 col-form-label col-form-label">Price ($)</label>
                <div className="col-sm-5">
                  <input type="number" className="form-control form-control" id="price " name='price' onChange={this.handleChange} />
                </div>
              </div>

              <div className="dropdown my-3">
                <label for="colFormLabelLg" className="col-sm-2 col-form-label col-form-label">Type Switcher</label>
                <button className="btn btn-secondary dropdown-toggle" type="button" id="productType dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" name='dropDownSelection'>
                  {this.state.dropDownSelection}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li><a className="dropdown-item" onClick={this.handleToggle} id='DVD' name="DVD" >DVD</a></li>
                  <li><a className="dropdown-item" onClick={this.handleToggle} id='Furniture' name="Furniture" >Furniture</a></li>
                  <li><a className="dropdown-item" onClick={this.handleToggle} id='Book' name="Book" >Book</a></li>
                </ul>
              </div>
              <div className='my-4'></div>

              {
                this.state.dropDownSelection == 'DVD' &&
                <div className="row my-4">
                  <label for="colFormLabelLg" className="col-sm-2 col-form-label col-form-label">Size (MB)</label>
                  <div className="col-sm-5">
                    <input type="number" className="form-control form-control" id="size" name='size' onChange={this.handleChange} />
                  </div>
                  <p className="row ml-2 my-4">Desicirption</p>

                </div>
              }

              {
                this.state.dropDownSelection == 'Furniture' &&
                <div>
                  <div className="row my-4">
                    <label for="colFormLabelLg" className="col-sm-2 col-form-label col-form-label">Height (CM)</label>
                    <div className="col-sm-5">
                      <input type="number" className="form-control form-control" id="height" name='height' onChange={this.handleChange} />
                    </div>
                  </div>
                  <div className="row my-4">
                    <label for="colFormLabelLg" className="col-sm-2 col-form-label col-form-label">Width (CM)</label>
                    <div className="col-sm-5">
                      <input type="number" className="form-control form-control" id="width" name='width' onChange={this.handleChange} />
                    </div>
                  </div>
                  <div className="row my-4">
                    <label for="colFormLabelLg" className="col-sm-2 col-form-label col-form-label">Length (CM)</label>
                    <div className="col-sm-5">
                      <input type="number" className="form-control form-control" id="length" name='length' onChange={this.handleChange} />
                    </div>
                  </div>
                  <p className="row my-4">Desicirption</p>

                </div>
              }

              {
                this.state.dropDownSelection == 'Book' &&
                <div className="row my-4">
                  <label for="colFormLabelLg" className="col-sm-2 col-form-label col-form-label">Weight (KG)</label>
                  <div className="col-sm-5">
                    <input type="number" className="form-control form-control" id="weight" name='weight' onChange={this.handleChange} />
                  </div>
                  <p className="row my-4">Desicirption</p>
                </div>
              }
            </form>
          </div >
        </div >
      )
    }
  }
}

export default ProductAdd;


