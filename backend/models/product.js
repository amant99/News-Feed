const mongoose = require("mongoose");
const schema = mongoose.Schema;
const {ObjectId} = schema;

const productSchema = new schema({
    name : {
        type :String,
        required: true,
        maxlength:32,
        trim:true
    },
    description : {
        type :String,
        maxlength :2000,
        trim :true        
    },
    price : {
        type :Number,
        required :true,
    },
    category : {
        type :ObjectId,
        ref :"Category"
    },
    stock :{
        type :Number
    },
    sold :{
        type :Number,
        default :0
    },
    image : {
        data : Buffer,
        contentType: String
    }


}, {timestamps : true});


module.exports = mongoose.model("Product", productSchema);