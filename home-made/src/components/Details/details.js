import React from 'react';

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
        <React.Fragment>
        <div>
                    <img src={product.imageUrl} alt="pic" />
                    </div>
                <div>
                    <h2>{this.props.match.params.productId}</h2>
                     <h3>{product.name}</h3>
                    <p>{product.details}</p>
                    <h5>{this.state.price}$</h5>
                    <input type="number" onChange={(e)=>this.setPriceAndQuantity(e)}/>
                    <button onClick={()=>this.placeOrder(this.state)}>Buy</button>
                </div>
                </React.Fragment>
    )}
}

export default Details