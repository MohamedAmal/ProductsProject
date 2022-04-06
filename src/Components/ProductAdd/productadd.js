import React from 'react';
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
      redirect: false, skuError: null, nameError: null, priceError: null, typeError: null, sizeError: null,
      heightError: null, widthError: null, lengthError: null, weightError: null, formError: null
    };
  }
  handleChange(event) {
    const state = this.state
    state[event.target.name] = event.target.value
    this.setState(state);
  }

  handleToggle(e) {
    const state = this.state
    state.dropDownSelection = e.target.value
    this.setState(state);
    console.log('nnn', e.target.value)
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
  validate = () => {
    let tempErrorState = true
    //validate empty input
    if (!this.state.sku) { this.setState({ skuError: 'Please, submit required data' }); tempErrorState = false }
    if (!this.state.name) { this.setState({ nameError: 'Please, submit required data' }); tempErrorState = false }
    if (!this.state.price) { this.setState({ priceError: 'Please, submit required data' }); tempErrorState = false }
    //validate input
    if (isNaN(this.state.price) || this.state.price < 0) { this.setState({ priceError: 'Please, provide the data of indicated type' }); tempErrorState = false }

    if (this.state.dropDownSelection === 'DVD') {
      if (!this.state.size) { this.setState({ sizeError: 'Please, submit required data' }); tempErrorState = false }
      if (isNaN(this.state.size) || this.state.size < 0) { this.setState({ sizeError: 'Please, provide the data of indicated type' }); tempErrorState = false }
    }
    if (this.state.dropDownSelection === 'Furniture') {
      if (!this.state.height) { this.setState({ heightError: 'Please, submit required data' }); tempErrorState = false }
      //validate input
      if (isNaN(this.state.height) || this.state.height < 0) { this.setState({ heightError: 'Please, provide the data of indicated type' }); tempErrorState = false }
      if (!this.state.width) { this.setState({ widthError: 'Please, submit required data' }); tempErrorState = false }
      //validate input
      if (isNaN(this.state.width) || this.state.width < 0) { this.setState({ widthError: 'Please, provide the data of indicated type' }); tempErrorState = false }
      if (!this.state.length) { this.setState({ lengthError: 'Please, submit required data' }); tempErrorState = false }
      //validate input
      if (isNaN(this.state.length) || this.state.length < 0) { this.setState({ lengthError: 'Please, provide the data of indicated type' }); tempErrorState = false }
    }
    if (this.state.dropDownSelection === 'Book') {
      if (!this.state.weight) { this.setState({ weightError: 'Please, submit required data' }); tempErrorState = false }
      //validate input
      if (isNaN(this.state.weight) || this.state.weight < 0) { this.setState({ weightError: 'Please, provide the data of indicated type' }); tempErrorState = false }
    }
    console.log(tempErrorState)
    return tempErrorState
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (this.validate()) {
      console.log('validate', this.validate())
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

      await axios({
        method: 'POST',
        // url: 'http://localhost/index.php/',  // local
        url: 'http://productsproject.atwebpages.com/index.php/', //remote awardspace
        data: formData,
        config: { headers: { 'Content-Type': 'multipart/form-data' } }
      })
        .then(function (response) {
          // handle success
          console.log(response)
        })
        .catch(function (response) {
          //handle error
          console.log(response)
        });
      const redirect = true
      console.log(redirect)
      this.props.stateCommFunc(redirect)
      setTimeout(() => {
        console.log('redirect')
        this.setState({
          redirect: true
        })
      }, 0);
    }

  }


  render() {
    if (this.state.redirect) {
      return <Navigate to="/" />;
    }
    else {
      return (
        <div className="container">
          <div className='d-flex justify-content-between mt-4 mx-3 p-0'>
            <h2>Product Add</h2>
            <div className='d-flex justify-content-between'>
              <form onSubmit={this.handleSubmit}  >

                <button type="submit" className="btn btn-primary m-2" value="save">Save</button>

                <Link to="/" className="btn btn-success m-2">Cancel</Link>
              </form>
            </div>
          </div>
          <hr className='mx-3'></hr>
          <div className='row col-7 d-flex flex-row justify-content-start mx-1'>
            <form id="product_form" onSubmit={this.handleSubmit}>

              <div className="row ">
                <label htmlFor="colFormLabelLg" className="col-sm-2 col-form-label col-form-label">SKU</label>
                <div className="col-sm-5">
                  <input type="text" className="form-control" id="sku" name='sku' onChange={this.handleChange} />
                </div>
              </div>
              <div className="row py-2">
                <label htmlFor="colFormLabelLg" className="col-sm-2 col-form-label col-form-label">Name</label>
                <div className="col-sm-5">
                  <input type="text" className="form-control" id="name" name='name' onChange={this.handleChange} />
                </div>
              </div>
              <div className="row">
                <label htmlFor="colFormLabelLg" className="col-sm-2 col-form-label col-form-label">Price ($)</label>
                <div className="col-sm-5">
                  <input type="number" className="form-control" id="price" name='price' onChange={this.handleChange} />
                </div>
              </div>


              <div className="row py-2 ">
                <label htmlFor="colFormLabelLg" className="col-sm-2 col-form-label ">Type Switcher</label>
                <div className="col-sm-5">
                  <select onClick={this.handleToggle} style={{ width: "auto" }} id="productType" className=" form-select" aria-label="Default select example">
                    <option name="DVD" value="DVD" defaultValue="DVD" >DVD</option>
                    <option name="Furniture" value="Furniture">Furniture</option>
                    <option name="Book" value="Book">Book</option>
                  </select>
                </div>

              </div>

              {
                this.state.dropDownSelection === 'DVD' &&
                <div className="row mt-4">
                  <label htmlFor="colFormLabelLg" className="col-sm-2 col-form-label col-form-label">Size (MB)</label>
                  <div className="col-sm-5">
                    <input type="number" className="form-control form-control" id="size" name='size' onChange={this.handleChange} />
                  </div>
                  <p className="mt-4">Please, provide size</p>

                  {this.state.skuError && <p className="mt-4">{this.state.skuError}</p>}
                  {this.state.nameError && <p className="mt-4">{this.state.nameError}</p>}
                  {this.state.priceError && <p className="mt-4">{this.state.priceError}</p>}
                  {this.state.typeError && <p className="mt-4">{this.state.typeError}</p>}
                  {this.state.sizeError && <p className="mt-4">{this.state.sizeError}</p>}

                </div>
              }

              {
                this.state.dropDownSelection === 'Furniture' &&
                <div>
                  <div className="row mt-4">
                    <label htmlFor="colFormLabelLg" className="col-sm-2 col-form-label col-form-label">Height (CM)</label>
                    <div className="col-sm-5">
                      <input type="number" className="form-control form-control" id="height" name='height' onChange={this.handleChange} />
                    </div>
                  </div>
                  <div className="row py-2">
                    <label htmlFor="colFormLabelLg" className="col-sm-2 col-form-label col-form-label">Width (CM)</label>
                    <div className="col-sm-5">
                      <input type="number" className="form-control form-control" id="width" name='width' onChange={this.handleChange} />
                    </div>
                  </div>
                  <div className="row ">
                    <label htmlFor="colFormLabelLg" className="col-sm-2 col-form-label col-form-label">Length (CM)</label>
                    <div className="col-sm-5">
                      <input type="number" className="form-control form-control" id="length" name='length' onChange={this.handleChange} />
                    </div>
                  </div>
                  <p className=" mt-4">Please, provide dimensions</p>

                  {this.state.skuError && <p className="mt-4">{this.state.skuError}</p>}
                  {this.state.nameError && <p className="mt-4">{this.state.nameError}</p>}
                  {this.state.priceError && <p className="mt-4">{this.state.priceError}</p>}
                  {this.state.typeError && <p className="mt-4">{this.state.typeError}</p>}
                  {this.state.lengthError && <p className="mt-4">{this.state.lengthError}</p>}
                  {this.state.heightError && <p className="mt-4">{this.state.heightError}</p>}
                  {this.state.widthError && <p className="mt-4">{this.state.widthError}</p>}

                </div>
              }

              {
                this.state.dropDownSelection === 'Book' &&
                <div className="row my-4">
                  <label htmlFor="colFormLabelLg" className="col-sm-2 col-form-label col-form-label">Weight (KG)</label>
                  <div className="col-sm-5">
                    <input type="number" className="form-control form-control" id="weight" name='weight' onChange={this.handleChange} />
                  </div>
                  <p className="mt-4">Please, provide weight</p>

                  {this.state.skuError && <p className="mt-4">{this.state.skuError}</p>}
                  {this.state.nameError && <p className="mt-4">{this.state.nameError}</p>}
                  {this.state.priceError && <p className="mt-4">{this.state.priceError}</p>}
                  {this.state.typeError && <p className="mt-4">{this.state.typeError}</p>}
                  {this.state.weightError && <p className="mt-4">{this.state.weightError}</p>}

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


