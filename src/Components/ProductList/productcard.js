import React from 'react';
class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleData: { id: null, isChecked: false },
      clear: this.props.clear
    }
  }
  toggleChange = (id) => {
    const obj = {
      id: Number(id),
      isChecked: !this.state.toggleData.isChecked
    }
    this.props.commFunc(obj)
  }
  render() {
    return (
      <div key={this.props.id_db} className='col-3 p-3 main-card-container' id_db={this.props.id_db} >
        <div className="card" style={{ width: '18rem' }}>
          <div className="form-check m-3 mb-0 ">

            <input className="delete-checkbox form-check-input" Checked={this.state.toggleData.isChecked} defaultChecked={false}
              onClick={(() => this.toggleChange(this.props.id_db, this.props.sku, this.props.pname, this.props.price))}
              type="checkbox" value="" id="flexCheckDefault " />

          </div>
          <div className="card-body">
            {this.props.id_db}
            <h5 className="card-title t_sku">{this.props.sku}</h5>
            <h6 className="card-subtitle mb-2 text-muted t_title">{this.props.pname}</h6>
            <p className="card-text t_price">{this.props.type}</p>

          </div>
        </div>
      </div>
    );
  }
}
export default ProductCard;