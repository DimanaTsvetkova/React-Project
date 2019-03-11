const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
         ref:'User'
    },
    orders:[{
        type: Schema.Types.ObjectId,
         ref:'Order'
    }],
    name:{
        type:Schema.Types.String, 
        required:true
    },
    type:{
        type:Schema.Types.String,
        required:true
        // default?
    },
    details:{
        type:Schema.Types.String
    },
    price:{
        type: Schema.Types.Number,
        required:true
    },
    imageUrl:{
        type:Schema.Types.String
    }
})

const Product = mongoose.model('Product',productSchema);

module.exports = Product;