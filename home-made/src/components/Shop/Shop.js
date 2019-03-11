import React from 'react';
import {Link} from 'react-router-dom';
import './shop.css';


class  Shop extends React.Component{
  
    render(){
    return(
        <main>
            <h2>Products</h2>
           
            {
                this.props.products.map(product=>(
                   <div className="product-box" key={product._id}>
                    <div>
                    <img src={product.imageUrl} alt="pic" />
                    </div>
                <div>
                    <h2>{product.name}</h2>
                    <p>{product.details}</p>
                    <h5>{product.price}$</h5>
                    < Link to={"/shop/product/"+product._id}>Buy</Link>
                </div>
                </div>
                ))
            }
        </main>
    )
        }
}


export default Shop;