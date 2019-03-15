import React from 'react';
import './Home.css';
import {Link} from 'react-router-dom';
import shoppingCart from '../../pics/shopping-cart.svg';

function Home(props){
  return(
  
        <main >
        <div className="pic">
          <Link to="/shop/products" className="start-shopping">
            <div>
              <p style={{color: 'black'}}> Fresh</p>
            </div>
            <img src={shoppingCart} alt="shopping" className="shopping-cart" />
            <div> <p>Products </p></div>
          </Link>
        </div>
       
      </main>
    )
}
export default Home