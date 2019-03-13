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
          
          isLoaded ?
          orders.map(order =>(
              <li className="my-orders-li" key={order._id}>
              <div className="li-img">
                <img src={order.productId.imageUrl} alt="ok"/>

              </div>
              <section className="order-details">
                <h2>{order.productId.name}</h2>
              <h4>Product details</h4>
                <p>{order.productId.details}</p>
                <span>Price:{order.price} $</span><br/>
                <span>Current status: {order.orderStatus}</span>

              </section>
              {/* <button className="recieve-btn">Recieved</button> */}
              </li>
          )) : (<h2>Loading...</h2>)

        }
        </ul>
</main>

      
    )
    }
    }
export default MyOrders;