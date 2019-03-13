import React from 'react';
import {Link} from 'react-router-dom';
import './shop.css';


class  Shop extends React.Component{
  
    render(){
    return(
        <main className="shop-page">
            <h2>Products</h2>
           
            {
                this.props.products.map(product=>(
                   <div className="product-box" key={product._id}>
                    <section>
                    <img src={product.imageUrl} alt="pic" />
                    </section>
                    <section>
                        {product.name.length>12 ? 
                        <h3>{product.name.slice(0,10)}...</h3>
                   : 
                   <h3>{product.name}</h3>
                        }
                     { product.details.length>40 ? 
                        <p>{product.details.slice(0,30)}...</p>
                   : 
                   <p>{product.details}</p>
                        }
                    <h5 className="pr-price">{product.price} $</h5>
                    < Link to={"/shop/product/"+product._id} className="buy-btn">Buy</Link>
                    </section>
                </div>
                ))
            }
        </main>
    )
        }
}


export default Shop;