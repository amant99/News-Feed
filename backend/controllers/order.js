const { Order, Cart } = require("../models/order");

exports.getOrderById = (req, res, id, next) =>{
    Order.findById(id)
    .populate("products.product", "name price")
        .exec((err, order)=>{
            if(err){
                return res.statud(400).json({
                err: "No Order Found"
            });
            }
            req.order = order;
            next();
        })
}

exports.createOrder = (req, res) =>{
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    order.save((err, orders)=>{
        if(err){
            return res.status(400).json({
                err : "Unable to Save order in DB....."
            });
        }
        res.json(orders);
    })
}

exports.getAllOrders = (req, res) =>{
    Order.find()
        .populate("user", "_id name lastname")
        .exec((err, order) => {
            if(err){
                return res.status(400).json({
                    err : "No Orders....."
                });
            }
            res.json(order);
        });
}

exports.getOrderStatus = (req, res) =>{
    res.json(Order.schema.path("status").enumValues)
}

exports.updateOrderStatus = (req, res) =>{
    Order.update(
        {_id: req.body.orderId},
        {$set: {status: req.body.status}},
        (err, order)=>{
            if(err){
                return res.status(400).json({
                    errorr: "Unable to update status"
                });
            }
            res.json(order);
        }
    )

}
