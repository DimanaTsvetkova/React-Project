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
import Delete from '../Details/delete';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      products: [],
      orders: [],
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
    }).then(res => res.json())
      .then(data => {
        console.log(data)

        if (!data.userId) {
          console.error("Wrong username or password");
        } else {

          console.log(`Welcome ${data.name}`)
          localStorage.setItem('imageUrl', data.imageUrl);
          localStorage.setItem('userId', data.userId);
          localStorage.setItem('name', data.name);

          this.setState({
            user: data.name,
          })
          localStorage.setItem('isLogged', true)
          if (data.name === "Admin") {
            localStorage.setItem('isAdmin', true);

          } 
          
        }
      }).catch(e => console.error(e))
  }

  

  
getAllProducts(){
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


  componentDidMount() {
    this.setState({
      user: localStorage.getItem('username')

    })
   this.getAllProducts()

  }
  componentDidUpdate(prevProps, prevState){
    if(prevState == this.state){
      this.getAllProducts()
    }
  }


  setCreditentials(e) {
    let { name, value } = e.target;
    this.setState({
      [name]: value
    })

  }

  logout() {
    localStorage.clear();
    this.setState({
      isAdmin: false,
      user: ""
    })
  }


    


  render() {
    return (
      <div className="App">

        <Header name={localStorage.getItem('name')}
          userId={localStorage.getItem('userId')}
          imageUrl={localStorage.getItem('imageUrl')} />
        <Switch>
          <Route path="/" exact render={() =>
            <Home toShop={this.toShop} />} />

          <Route path="/register" render={(props) =>
            <Register
              {...props}
              setCreditentials={this.setCreditentials}
              onSubmit={this.onSubmit}
            />
          } />
          <Route path="/login" render={
            (props) =>
              <Login
                {...props}
                setCreditentials={this.setCreditentials}
                onSubmit={this.onSubmit}
                 />

          } />
          <Route path="/product/delete/:productId" component={Delete}/>

          <Route path="/logout" render={() => {
            this.logout()
            return (
              <Redirect to="/" />
            )
          }} />

          <Route path="/product/create/:userId" render={(props) =>
            <CreateProduct {...props}
              setCreditentials={this.setCreditentials}
              userId={localStorage.getItem("userId")}
            />
          } />

          <Route path="/shop/products" render={(props) =>
            <Shop {...props} products={this.state.products} createOrder={this.createOrder}
            />
          } />

          <Route path="/shop/product/:productId" exact component={Details} />
          <Route path="/my/orders/:userId" component={MyOrders} />
          <Route path="/my/products/:userId" component={UserProfile} />
        </Switch>
      </div>
    );
  }
}

export default App;
