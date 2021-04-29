const User = require("../models/user");
const Order = require("../models/order");
const { isBuffer } = require("lodash");

// getting User _id
exports.getUserById = (req, res, next, id) =>{
    User.findById(id).exec((err, user) =>{
        if (err || !user){
            return res.status(402).json({
                error: "USER NOT FOUND"
            });
        }
        req.profile = user;
        next();
    });
}

// getting the user
exports.getUser = (req, res)=>{
    req.profile.salt= undefined;
    req.profile.encrypted_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt= undefined;
    return res.json(req.profile);
}

//update user details
exports.updateUser = (req, res)=>{
    User.findByIdAndUpdate(
        {_id: req.profile._id},
        {$set: req.body},
        {new: true, useFindAndModify: false},
        (err, user) =>{
            if (err){
                return res.status(400).json({
                        err: "unable to upadte"
                });
            }
            user.salt= undefined;
            user.encrypted_password = undefined;
            user.createdAt = undefined;
            user.updatedAt= undefined;
            res.json(user);
        }

    )
}

// user Purchase List
exports.userPurchaseList = (req ,res)=>{
    Order.find({user: req.profile._id})
    .populate("user", "_id name")
    .exec((err, order) =>{
        if(err){
            return res.status(402).json({
                err: "No Orders"
            });
        }
        return res.json(order);
    })
}

// middleware(custom)
exports.pushOrderinPurchaseList = (req, res, next) =>{
    let purchases = [];
    console.log(req.body.order)
    req.body.order.products.forEach(product =>{
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            qauntity: product.qauntity,
            amount: req.body.order.amount,
            transaction_id: req.body.order.transaction_id
        });
    });
    
    //storing in DB
    User.findOneAndUpdate(
        { _id: req.profile._id},
        { $push : { purchases : purchases}},
        {new: true},
        (err, purchases)=>{
            if (err){
                return res.status(400).json({
                    err: "Unable to save in DB....."
                });
            }
            next();
        }
    );  

}















/*getting all users
exports.getAllUsers = (req, res)=>{
    User.find().exec((err, user)=>{
        if (err || !user){
            return res.status(400).json({
                err: "No data Found"
            });
        }
        res.json(user)
    })
}
*/
