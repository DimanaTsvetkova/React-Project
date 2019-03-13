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
          console.error(data.errors);
        } else {
          console.log(data)
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
