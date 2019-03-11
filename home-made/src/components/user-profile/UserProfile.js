import React from  'react';

class UserProfile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            products:[],
            isLoaded:false
        }
    }
    componentWillMount(){
        fetch(`http://localhost:9999/shop/my/products/${localStorage.getItem('userId')}`)
          .then(res=> res.json())
          .then(data=>{
              console.log(data)
            if (data.errors) {
              return console.error(data.message);
            }
            this.setState({
              products: data.products,
              isLoaded:true
            })
          })
        }




          render (){
            const {isLoaded, products} = this.state
    return(
        <div>        <h2>My products</h2>
            <p>{products}</p></div>

      
    )
    }
    }
export default UserProfile;