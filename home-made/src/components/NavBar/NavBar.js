import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../pics/Home-Made-Logo.svg';
import shoppingBasket from '../../pics/shopping-basket.svg'
// import altUser from '../../pics/alt-user.jpg'
import './NavBar.css';
function NavBar(props){
    return(
        <header>
        <nav>

          {props.userId ? 
        <NavLink to={"/my/orders/"+props.userId} className="shopping-basket"><img  src={shoppingBasket} alt="Cart"/></NavLink>
        :
        null
          }


          <NavLink to="/" className="logo" >  <img src={logo} alt="HomeMade" /></NavLink>
            {
              props.userId ? 
          (<div>
             
                 <NavLink to="/shop/products" className="a">Shop</NavLink>
                 <NavLink className="a" to={'/product/create/'+localStorage.getItem('userId')}>Sell</NavLink>
          </div>
                ) :(null)
            }
            { 
              props.userId ? 
                  <div>
              <div className="user-nav-div">
                  <NavLink className="user-nav-span" to={"/my/products/"+localStorage.getItem("userId")}>
                     <img className="user-nav" src={props.imageUrl} alt="img"/>
                     <span >{props.name}</span>
                    
                     </NavLink>
                  </div>
               <NavLink className="a" to="/logout">Logout</NavLink>
               </div> : 
               <div className="anonymous-nav-div">
               <NavLink to="/register" className="a">Register</NavLink>
               <NavLink to="/login" className="a">Login</NavLink>
              </div>
              }


        </nav>
      </header>
    )
}

export default NavBar;