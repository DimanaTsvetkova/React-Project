import React, { Component } from 'react';
import './create-form.css';

class CreateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:"",
      type:"Vegetables",
      details:"",
      price:null,
      imageUrl:"",
      user: this.props.userId
    }
    this.setCreditentials = props.setCreditentials.bind(this);
  }
  render() {
    return (
      <main>
      <div className="create-product">
        <form onSubmit={(e)=>
         this.props.createProduct(e, this.state)}>
         <div className="inputs">
         <div>
          <input onChange={this.setCreditentials} type="text" name="name" placeholder="Name" />
          <select onChange={this.setCreditentials} type="text" name="type" placeholder="Type" >
          <option value="Vegetables">Vegetables</option>
          <option value="Fruits">Fruits</option>
          <option value="Home made product">Home made product</option>
          <option value="Other">Other</option>
          </select>
            <textarea type="text" onChange={this.setCreditentials} name="details" placeholder="Details"/>
            </div>
            <div>
            <input type="text" onChange={this.setCreditentials} name="imageUrl" placeholder="Picture URL"/>

          <input onChange={this.setCreditentials} type="number" name="price" placeholder="Price" />
          </div>
          </div>
          <input type="submit" className="product-btn" value="Post product" />
        </form>

      </div>
      </main>
    );
  }
}

export default CreateProduct;
