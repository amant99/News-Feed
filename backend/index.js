
const mongoose = require('mongoose')
require('dotenv').config()
const  bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const express = require("express")
const app =express()

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");


// DB Connetion
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser : true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(() =>{
    console.log("DB CONNECTED");
}).catch(() =>{ 
    console.log("FAILED.....");
});

//MiddleWares
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

//My Routes
app.use("/api" , authRoutes);
app.use("/api" , userRoutes);





//Ports
const port = process.env.PORT || 8000 

//Listening
app.listen(port , () =>{
    console.log(`SERVER UP AND RUNNING`);
});

