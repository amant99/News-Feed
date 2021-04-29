var express = require("express");
var router = express.Router();

const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth");
const {getUserById } = require("../controllers/user");
const { getProductById, 
        createProduct, 
        getProduct, 
        photo, 
        updateProduct, 
        deleteProduct, 
        getAllProducts, 
        getAllUniqueCategory} = require("../controllers/products");

//params
router.param("userId", getUserById);
router.param("productId", getProductById);

// common routes
router.post("/product/create/:userId",isSignedIn, isAuthenticated, isAdmin, createProduct );
router.get("/product/:productId", getProduct );
router.get("/product/photo/:productId", photo);

//update route
router.put("/products/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, updateProduct);

//delete route
router.delete("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, deleteProduct);

//listing route
router.get("/products", getAllProducts);
router.get("/products/categories", getAllUniqueCategory);

module.exports = router;