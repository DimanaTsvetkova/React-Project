const Product = require('../models/Product');
const User = require('../models/User');

module.exports = {
  getProducts: (req, res) => {
    Product.find()
      .then((products) => {
        res
          .status(200)
          .json({ message: 'Fetched products successfully.', products });
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
       
      });
  },
  findProduct:(req,res)=>{
    let productId = req.params.productId;
    Product.findById(productId)
    .then(product=>{
      res
          .status(200)
          .json({ message: 'Product Found.', product });
    }).catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
    
    });
  },
  createProduct: (req, res) => {
    const userId = req.params.userId;
    const productObj = req.body;

    Promise.all([Product.create(productObj), User.findById(userId)])
    .then(([product, user])=>{
      user.products.push(product);

      res.status(200)
      .json({
        message: 'Product created successfully!',
        product
      })
     
          return User.findByIdAndUpdate(userId, user);
    }).then((res)=>{ console.log(res)
    }).catch(e => console.error(e));
  },

  getUserProducts:(req, res)=>{
    const userId = req.params.userId;

    User.findById(userId)
    .populate({
       path:'products',
    model:'Product',
     populate:{
    path:'orders',
  model:'Order'}
     }).then((user)=>{
       console.log(user)
       res.status(200)
       .json({message: 'Fetched current user products!', user});
     })
     .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
     
    });
  },

  getDeleteProduct: (req, res, next) => {
    const id = req.params.productId;
    console.log(id)
    Product.findById(id)
      .then((product) => {
        res
          .status(200)
          .json({ message: 'Fetched delete page.', product })
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        next(error);
      });
  },

  deleteProduct: (req, res) => {
    const id = req.params.productId;
    Product.findByIdAndDelete(id)
      .then(
        res.status(200)
          .json({
            message: "Product deleted!",
            id
          })
      )
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }

      });
    }
  }
