import React from 'react';
class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleData: { id: null, isChecked: false }
    }
  }

  toggleChange = (e, id) => {
    const obj = {
      id: Number(id),
      isChecked: e.target.checked
    }
    this.props.commFunc(obj)
  }

  render() {
    return (
      <div className='col-3 p-3 main-card-container text-center' id_db={this.props.id_db} >
        <div className="card" style={{ width: '18rem' }}>
          <div className="form-check m-3 mb-0 ">

            <input className="delete-checkbox form-check-input" defaultChecked={false}
              onClick={((e) => this.toggleChange(e, this.props.id_db))}
              type="checkbox" id="flexCheckDefault" />

          </div>
          <div className="card-body">
            <h5 className="card-title">{this.props.sku}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{this.props.pname}</h6>
            <p className="card-text">{this.props.price} $</p>
            {this.props.type === 'DVD' && <p className="card-text">Size:{this.props.size} MB</p>}
            {this.props.type === 'Furniture' && <p className="card-text">Dimension:{this.props.length}x{this.props.width}x{this.props.height}</p>}
            {this.props.type === 'Book' && <p className="card-text">{this.props.weight}KG</p>}

          </div>
        </div>
      </div>
    );
  }
}
export default ProductCard;

