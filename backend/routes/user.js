var express = require('express')
var router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById, getUser, updateUser, userPurchaseList, pushOrderinPurchaseList } = require("../controllers/user");

router.param("userId", getUserById);

router.get("/user/:userId", isAuthenticated, isSignedIn, getUser);
router.put("/user/:userId", isAuthenticated, isSignedIn, updateUser);
router.get("/orders/user/:userId", isAuthenticated, isSignedIn, pushOrderinPurchaseList, userPurchaseList);

module.exports = router;



/* getting all user info route
router.get("/users" , getAllUsers);
*/