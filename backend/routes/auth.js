var express = require('express')
var router = express.Router()
const { check } = require('express-validator');
const {signout, signup, signin, isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth")

// custom validation message in routes
router.post(
    "/signup",
    [
      check("name", "name should be atleast 3 characters").isLength({ min: 3 }),
      check("email", "enter a valid e-mail ").isEmail(),
      check("password", "password should be atleast 3 characters").isLength({ min: 3 })
    ],
    signup
  );

  router.post(
    "/signin",
    [
      check("email", "email is required").isEmail(),
      check("password", "password field is required").isLength({ min: 1 })
    ],
    signin
  );
  
router.get("/signout", signout);


//testing protected route
router.get("/test",  (req, res)=>{
    res.send("Yeah..... Its Working...");
});

module.exports = router;
