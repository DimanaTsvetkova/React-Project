const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Виж си ордърите
const orderSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        required: true,
        ref:'User'
    },
  
   productId:{
       type: Schema.Types.ObjectId,
       required:true,
       ref:'Product'
   },

   quantity:{
       type:Schema.Types.Number,
       required:true
   },
   price:{
       type:Schema.Types.Number,
       required:true
   }
})

const Order = mongoose.model('Order',orderSchema);

module.exports = Order;