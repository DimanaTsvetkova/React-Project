const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
module.exports = {
 
  createOrder: (req, res) => {
    const orderObj = req.body;
    const userId = req.body.user;
    const productId = req.body.productId;
 

    Promise.all([Order.create(orderObj), User.findById(userId), Product.findById(productId)])
    .then(([order, user, product])=>{
      user.orders.push(order);
      product.orders.push(order);
      res.status(200)
      .json({
        message: 'Order created successfully!',
        order
      })
      return Promise.all([User.findByIdAndUpdate(userId, user),
              Product.findByIdAndUpdate(productId, product)])
    }).then(()=>{})
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
    
    });
  },

  getCurrentUserOrders(req,res){
    let userId = req.params.userId;
    User.findById(userId)
    .populate({
      path:'orders',
      model:'Order',
       populate:{
      path:'productId',
    model:'Product'}
  })
    .then((orders) => {
      res
        .status(200)
        .json({ message: 'lalala', orders });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
     
    });
     
   

   
  }
}


