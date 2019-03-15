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

          { localStorage.getItem('isLogged')  ? 
          localStorage.getItem('isAdmin')? null :
        <NavLink to={"/my/orders/"+props.userId} className="shopping-basket"><img  src={shoppingBasket} alt="Cart"/></NavLink>
        :
        null
          }


          <NavLink to="/" className="logo" >  <img src={logo} alt="HomeMade" /></NavLink>
          
            {
             localStorage.getItem('isLogged') ?
          (<div>
          <NavLink to="/shop/products" className="a">Shop</NavLink>
                
                {
                  localStorage.getItem('isAdmin') ? null :
                 <NavLink className="a" to={'/product/create/'+localStorage.getItem('userId')}>Sell</NavLink>
                }
          </div>
                ) :(<div className="anon-div"><NavLink to="/shop/products" className="a">Shop</NavLink> </div>)
            }
            { 
             localStorage.getItem('isLogged') ? 
                  <div>
              <div className="user-nav-div">
              {
                localStorage.getItem('isAdmin')?
              <div className="user-nav-span">
                 <img className="user-nav-pic" src={props.imageUrl} alt="img"/>
                     <span >{props.name}</span>
                     </div>
                     :
            
                  <NavLink className="user-nav-span" to={"/my/products/"+localStorage.getItem("userId")}>
                     <img className="user-nav-pic" src={props.imageUrl} alt="img"/>
                     <span >{props.name}</span>
                    
                     </NavLink>
            }
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