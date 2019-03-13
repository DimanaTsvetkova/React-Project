import React from 'react';
import './details.css';

class Delete extends React.Component{
    constructor(props){
        super(props);
        this.state={
         id:null,
         name:null,
         imageUrl:null,
         content:null,
         type:null,
         details:null,
         price:null,
         orders:[]

        }
    }

    componentWillMount() {
        console.log("here")
        const request=async () =>{
            try{
                const response = await fetch('http://localhost:9999/shop/product/delete/' + this.props.match.params.productId);
                const json = await response.json();
                console.log(json);
                await  this.setState({
                 id:this.props.match.params.productId,
                 name:json.product.name,
                 imageUrl:json.product.imageUrl,
                 content:json.product.content,
                 type:json.product.type,
                 details:json.product.details,
                 price:json.product.price,
                 orders: json.product.orders
            })
        } 
          
           catch(error ){
               console.error(error)
           }
         }
           request()
        
      }
  
    
      deletePost(e, data) {
          
        e.preventDefault();
        
        fetch("http://localhost:9999/shop/product/delete/" + this.props.match.params.productId, {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" }
        })
          .then(
            
            rawData => rawData.json()
          )
          .then(
    
            body => {
              
              if (!body.errors) {
                  console.log("post deleted")
                this.props.history.push('/shop/products')    
              }
              else {
                console.log(body.message)
              }
            }
          )
          .catch(error => console.error(error));
      }

    render(){
        
      
    return(
        <main className="shop-page">
        <div>   
            <section className="img-section">
                    <img src={this.state.imageUrl} alt="pic" />
                    </section>
            <div className="order-det">
            
                 
            </div>
            
                        <div className="del-btn"> 
                        <h3>Delete product:</h3>
                    <button onClick={(e)=> this.deletePost(e, this.state)}  className="delete-btn">X</button>
                    </div>
                    
                    
                <section className="details-section">
                     <h3>{this.state.name}</h3>
                Details
                    <p>{this.state.details}</p>
                </section>
                </div>
                </main>
    )
            }
}

export default Delete