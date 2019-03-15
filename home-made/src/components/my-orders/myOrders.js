import React from  'react';
import './my-orders.css';
class MyOrders extends React.Component{
    constructor(props){
        super(props);
        this.state={
            orders:[],
            isLoaded:false
        }
    }
    componentWillMount(){
        fetch(`http://localhost:9999/cart/my/orders/${localStorage.getItem('userId')}`)
          .then(res=> res.json())
          .then(data=>{
            console.log(data)
            if (data.errors) {
              return console.error(data.message);
            }
            this.setState({
              orders: data.orders.orders,
              isLoaded:true
            })
          })
        }

      

          render (){
            const {isLoaded, orders} = this.state
    return(
        <main className="my-orders-background">     
           
        <ul>
        {
          orders.length>0?
          isLoaded ?
       
          orders.map(order =>(
              <li className="my-orders-li" key={order._id}>
              <div className="li-img">
                <img src={order.productId.imageUrl} alt="ok"/>

              </div>
                <h2>{order.productId.name}</h2>
              <section className="order-details-shopping-basket">
              <h4>Price:{order.price} $</h4>
                <p>Quantity: {order.quantity}</p>
                
              </section>
                <div>
               
                </div>
              </li> 
          )) 
          : (<h2>Loading...</h2>)
               
            :<h2 className="no-pr">Your shpping basket is empty</h2>
        }
        </ul>
</main>

      
    )
    }
    }
export default MyOrders;
