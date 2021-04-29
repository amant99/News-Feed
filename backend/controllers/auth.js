const User = require("../models/user")
const { validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

// signup method 
exports.signup=(req,res)=>{
    // res.json({message:"signup working successfully!"})

    //checking for errors
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg,
            param: errors.array()[0].param
        });
    }

    //storing json data 
    const user = new User(req.body);

    //saving json data from rqst
    user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                err:"NOT able to save user in Database"
            });
        }
        res.json({
            name : user.name,
            email : user.email,
            id : user._id
        });
    })  //     we can acess all methods moongoose provide as it is obj of that class

}

//signin method
exports.signin=(req,res) =>{
    const errors = validationResult(req);
    const {email , password} = req.body;
    

    if(!errors.isEmpty()){ 
        return res.status(422).json({
            error: errors.array()[0].msg,
            param: errors.array()[0].param
        });
    }

    User.findOne({email}, (err,user)=>{
        if(err || !user){
            return res.status(402).json({
                Error:"Email Doesn't Exist"
            });
        }

        if(!user.autheticate(password)){
            return res.status(401).json({
                Error : "Email and password doesn't match"
            });
        }
     
        //create token
        const token = jwt.sign({_id: user._id}, process.env.SECRET);
        //put token in cookie
        res.cookie("token" , token , {expire: new Date() +9999});

        //send response to frontend
        const { _id, name, email, role } = user;
        return res.json({ token ,user: {_id, name, email, role }});
    });
};

// signout method
exports.signout=(req,res)=>{
    res.clearCookie("token");
    res.json({
        message:"successfully signed-out"  // json returns object & key:value pair
    });
};

//protected routes
exports.isSignedIn = expressJwt({
    secret : process.env.SECRET,
    userProperty : "auth"
});

//custom middlewares
exports.isAuthenticated = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({
                    err : "Access Denied"
                });
            }
            next();
        });
    } else {
        return res.status(401);
    }
};

exports.isAdmin = (req, res, next) => {
    if ( req.profile.role == 0 ){
        return res.status(403).json({
            error: "YOU ARE NOT ADMIN"
        });
    }
    next();
};