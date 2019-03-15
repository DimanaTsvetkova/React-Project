import React, { Component } from 'react';
import {toast} from 'react-toastify';
import './create-form.css';


class CreateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:"",
      type:"Vegetables",
      details:"",
      price:null,
      imageUrl:"data:image/jpeg;base64,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",
      user: this.props.userId
    }
    this.setCreditentials = props.setCreditentials.bind(this);
  }

  createProduct(e, data) {
    e.preventDefault();
    fetch(`http://localhost:9999/shop/product/create/${localStorage.getItem("userId")}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(data => {
        if (data.errors) {
          toast.error(data.errors);
        } else {
          toast.success("Product put for sale!")
          this.props.history.push('/shop/products');

        }
      }).catch(e => console.error(e))

  }


  render() {
    return (
     
      <main className="create-pr-main">
      <div className="create-product">
        <form onSubmit={(e)=>
         this.createProduct(e, this.state)}>
         <div className="inputs">
         <div>
          <input className="create-inp" onChange={this.setCreditentials} type="text" name="name" required placeholder="Name" />
          <select onChange={this.setCreditentials} type="text" name="type" placeholder="Type" >
          <option value="Vegetables">Vegetables</option>
          <option value="Fruits">Fruits</option>
          <option value="Home made product">Home made product</option>
          <option value="Other">Other</option>
          </select>
            <textarea className="create-inp" type="text" onChange={this.setCreditentials} name="details" placeholder="Details"/>
            </div>
            <div>
            <input className="create-inp" type="text" onChange={this.setCreditentials} name="imageUrl" placeholder="Picture URL"/>

          <input className="create-inp" onChange={this.setCreditentials} type="text" pattern="^\d*(\.\d{0,2})?$" required name="price" placeholder="Price" />
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
