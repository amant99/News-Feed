var express = require("express");
var router = express.Router();

const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth");
const {getUserById, pushOrderinPurchaseList} = require("../controllers/user");
const {updateStock} = require("../controllers/products");
const {getOrderById, createOrder, getAllOrders, updateOrderStatus, getOrderStatus} = require("../controllers/order");

//params
router.param("userId", getUserById);
router.param("orderId", getOrderById);

//routes
router.post("/orders/create/:userId", isSignedIn, isAuthenticated, pushOrderinPurchaseList, updateStock, createOrder);
router.get("/orders/all/:userId", isSignedIn, isAuthenticated, isAdmin, getAllOrders);

//order status
router.get("/order/status/:userId", getOrderStatus)
router.put("/orders/update/:orderId/status/:userId", updateOrderStatus);


module.exports = router;