import React from  'react';

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
        <React.Fragment>     
             <div>MyOrders</div>
        <ul>
        {
          isLoaded ?
          orders.map(order =>(
              <li key={order._id}>
                <h2>{order.productId.name}</h2>
                <img src={order.productId.imageUrl} alt="ok"/>
                <p>{order.productId.details}</p>
              </li>
          )) : (null)
        //  console.log  (isLoaded)
       
            // props.getMyOrders()
        }
        </ul>
</React.Fragment>

      
    )
    }
    }
export default MyOrders;