import React from 'react';
import './details.css';

class Details extends React.Component{
    constructor(props){
        super(props);
        this.state={
            user:localStorage.getItem('userId'),
            productId: this.props.match.params.productId,
            orderStatus: "Order sent",
            price:null,
            quantity:null,
            product:{},

        }
        this.placeOrder= this.placeOrder.bind(this)
    }

    componentWillMount(){
        const request = async () => {
            try{
            const response = await fetch(`http://localhost:9999/shop/product/${this.state.productId}`);
            const json = await response.json();
            console.log(json.product);
            await this.setState({
                product:json.product,
                price:Number(json.product.price)
            })}
            catch (error){
                console.error(error);
                
            }
        
        }
        
        request();
    
        // .then((res)=>{
        //     res.json()
        //     console.log(res)
        //     fetch(res.url).then(res=>{
        //         res.json()
        //         console.log(res)
        //     })
        // })
        // .then(data=>{
        //     console.log(data)
           
        //     // this.setState({
        //     //     
        //     // })
        // }).catch(error=> console.error(error));
    
    }

    setPriceAndQuantity(e){
       let qty = Number(e.target.value);
       let finalPrice
       qty === 0 ? (  finalPrice = this.state.product.price):
       ( finalPrice = qty*this.state.price);
       this.setState({
           price:finalPrice,
           quantity:qty
       })
    }

    placeOrder(data){
        console.log(data)
        fetch('http://localhost:9999/cart/order/create',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        }).then((res)=>{
            res.json()
        }).then(data=>{
            console.log('Order created!');
            console.log(data)
        }).catch(e=>{
            console.error(e);
        })
        
    }
    
    render(){
        let {product} = this.state
    return(
        <main className="shop-page">
        <div>   
            <section className="img-section">
                    <img src={product.imageUrl} alt="pic" />
                    </section>
            <div className="order-det">
            <input type="number" placeholder="Quantity:" name="quantity" className="quantity-inp" onChange={(e)=>this.setPriceAndQuantity(e)}/>
            
                    <h3>Final price: {this.state.price} $</h3>
                    <button className="order-btn" onClick={()=>this.placeOrder(this.state)}>Order</button>
            </div>
                <section className="details-section">
                     <h3>{product.name}</h3>
                Details
                    <p>{product.details}</p>
                </section>
                </div>
                </main>
    )}
}

export default Details