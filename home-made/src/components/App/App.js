import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Home from '../Home/Home'
import Header from '../NavBar/NavBar';
import Register from '../Register/Register';
import Login from '../Login/Login';
import CreateProduct from '../CreateProduct/CreateProduct';
import Shop from '../Shop/Shop';
import Details from '../Details/details';
import MyOrders from '../my-orders/myOrders';
import UserProfile from '../user-profile/UserProfile';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      isAdmin: false,
      products:[],
      orders:[]
    }
    this.onSubmit = this.onSubmit.bind(this);

  }

  onSubmit(e, data, path) {
    e.preventDefault();
    console.log(path)
    console.log(data)
    const url = `http://localhost:9999/auth/${path}`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    } ).then(res => res.json())
      .then(data => {
        console.log(data)

        if (!data.userId) {
          console.error("Wrong username or password");
        } else {
          console.log(`Welcome ${data.name}`)
          localStorage.setItem('imageUrl', data.imageUrl);
          localStorage.setItem('userId', data.userId)
          localStorage.setItem('name', data.name)

          this.setState({
            user: data.name,
          })
          if (data.name === "Admin") {
            this.setState({
              isAdmin: true
            })
          } else {
            this.setState({
              isAdmin: false
            })
            
            // return <Redirect to="/"/>
          }
          
        }
      }).catch(e => console.error(e))
  }


  createProduct(e, data) {
    e.preventDefault();
    fetch(`http://localhost:9999/shop/product/create/${localStorage.getItem("userId")}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(data => {
        if (data.errors) {
          console.error(data.errors);
        } else {
          console.log(data)
          // console.log(`Product ${data.name}`)
        
          
        }
      }).catch(e => console.error(e))

      // const request = async () => {
      //   try{
      //   const response = await fetch(`http://localhost:9999/shop/product/create/${localStorage.getItem('userId')}`, {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json"
      //     },
      //     body: JSON.stringify(data)
      //   });
      //   const json = await response.json();
      //   console.log(json);
      //   }
      //   catch (error){
      //       console.error(error);
            
      //   }
      // }
      // request();
}

 
 
  componentWillMount() {
    this.setState({
      user: localStorage.getItem('username')

    })
    fetch("http://localhost:9999/shop/products")
      .then(res => res.json())
      .then(data => {
        if (data.errors) {
          return console.error(data.message);
        }
        this.setState({
          products: data.products
        })
      }).catch(e => console.error(e))
    
      
 
  }

      
      
      //   const request = async () => {
      //     try{
      //     const response = await fetch(`http://localhost:9999/cart/my/orders/${localStorage.getItem('userId')}`);
      //     const json = await response.json();
      //     console.log(json.orders);
      //      this.setState({
      //        orders: json.orders
      //     })
      //   console.log(this.state.orders)
      //   }
      //     catch (error){
      //         console.error(error);
              
      //     }
      
      // }
      
      // request();

  setCreditentials(e) {
    let { name, value } = e.target;
    this.setState({
      [name]: value
    })

  }

  logout() {
    localStorage.clear();
    this.setState({
      isLoggedIn: false,
      isAdmin: false,
      user: ""
    })
  }

  render() {
    return (
      <div className="App">
      {/* Когато името е повече от едно трябва да се показва само първото или първите 10 символа
       */}
        <Header  name={localStorage.getItem('name')}
              userId={localStorage.getItem('userId')}
            imageUrl={localStorage.getItem('imageUrl')} />
        <Switch>
          <Route path="/" exact component={Home}/>
         
          <Route path="/register" render={(props) =>
            <Register
              {...props}
              setCreditentials={this.setCreditentials}
              onSubmit={this.onSubmit}
            />
          } />
      {/* {
        this.state.user ? <Redirect to="/"/>: null
      } */}
          <Route path="/login" render={
            (props) =>
              <Login
                {...props}
                setCreditentials={this.setCreditentials}
                onSubmit={this.onSubmit} />
              } />
     <Route path="/logout" render={() => {
            this.logout()
            return (
              <Redirect to="/" />
            )
          }} />

          <Route path="/product/create/:userId" render={(props)=>
          <CreateProduct {...props}
          setCreditentials={this.setCreditentials}
          createProduct = {this.createProduct.bind(this)}
          
          userId={localStorage.getItem("userId")}
          />
          }/>
          
          <Route path="/shop/products" render={(props)=>
            <Shop {...props} products={this.state.products} createOrder={this.createOrder}
             />
          }/>

          <Route path="/shop/product/:productId" component={Details}/> 
          <Route path="/my/orders/:userId" component={MyOrders}/>
          <Route path="/my/products/:userId" component={UserProfile}/>
        </Switch>
      </div>
    );
  }
}

export default App;
