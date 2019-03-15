import React from 'react';
import { Link,Redirect } from 'react-router-dom'
import './user-profile.css';
class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      isLoaded: false
    }
  }
  componentWillMount() {
    fetch(`http://localhost:9999/shop/my/products/${localStorage.getItem('userId')}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.errors) {
          return console.error(data.message);
        }
        this.setState({
          user: data.user,
          isLoaded: true
        })
      })
  }




  render() {
    const { isLoaded, user } = this.state
    return (
      localStorage.getItem('isAdmin') ? <Redirect to="/shop/products"/> :
      isLoaded ?
      <main className="user-background">
        <div className="user-creds">
          <div>
            <img src={user.imageUrl} className="user-profile-img" alt="userPic" />
          </div>
          <h3 >{user.fullName}</h3>
          <h4>{user.username}</h4>
        </div>

        {
          user.products.length > 0 ?
        <div className="user-all">
          <section className="my-products-section">
            <h2>My products</h2>
            <ul>
              {user.products.length > 0 ?
                user.products.map(product =>
                  <li key={product._id}>
                    <div className="li-img">
                      <img src={product.imageUrl} alt="productPic" />
                    </div>
                    <section className="order-details">
                      <h2>{product.name}</h2>
                      <Link to={"/shop/product/" + product._id} className="det-btn">Details</Link>
                    </section>
                  </li>
                )
                :
                <h2>You have no products for sale</h2>
              }
            </ul>
          </section>

          <section className="recieved-orders-section">
            <h2>Recieved orders</h2>
            <ul className="recieved-orders">
              {
                user.products.map(product =>
                  product.orders.map(order =>
                    <li key={order._id}>
                      <div className="li-img">
                        <img src={product.imageUrl} alt="productPic" />
                      </div>

                      <section>
                        <h2>{product.name}<span className="price">Price:{order.price} $</span></h2>

                        <section className="recieved-order-details">
                          <div>
                            <span>Quantity: {order.quantity}</span><br />
                          </div>
                          <div>
                          </div>
                      {/* <button>Send</button> */}
                        </section>
                      </section>
                    </li>
                  ))
              }
            </ul>
          </section>

        </div>
        : <h2 className="no-pr">You have no products put for sale yet!</h2>
        }

      </main> 
      :
      <h2>Loading...</h2>


    )
  }


}
export default UserProfile;