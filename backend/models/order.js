const mongoose = require("mongoose");
const schema = mongoose.Schema;
const {ObjectId} = schema;

const productcartSchema = new schema({
    product : {
        type :ObjectId,
        ref : "Product"
    },
    name : String,
    count : Number,
    price : Number
});

const Cart = mongoose.model("ProductCart",productcartSchema);

const orderSchema = new schema({
    products : [productcartSchema],
    transaction_id : {},
    amount :{type: Number},
    address : {String},
    status :{
        type : String,
        default : "Recieved",
        enum : ["Shipped", "Recieved", "Deliverd", "Proccessing", "Cancelled"]
    },
    updated : Date,
    user : {
        type : ObjectId,
        ref : "Users"
    },
} , {timestamps : true});

const Order = mongoose.model("Orders",orderSchema);

module.exports = { Order, Cart }

