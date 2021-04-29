const Category = require("../models/category");
let url = "";

exports.getCategoryById = (req, res, next, id) =>{ 
    Category.findById(id).exec((err, cat)=>{
        if (err){
            return res.status(400).json({
                err :"Unable to get Category"
            });
        }
        req.category = cat;
        url = cat;
    });
    next();
};

exports.createCategory =(req, res)=>{    
    const category = new Category(req.body);
    category.save((err, category)=>{
        if (err){

            return res.status(400).json({
                err :"Unable to Save Category"
            });
        }
        res.json({ category });
    });
};

exports.getCategory = (req, res)=>{
    res.json(url)  
};

exports.getAllCategory = (req, res) =>{
    Category.find().exec((err, category) =>{
        if (err){
            return res.status(400).json({
                err :"No Category Find"
            });
        }
        res.json(category);
    });
};

exports.updateCategory = (req, res) =>{
    const category = req.category;
    category.name = req.body.name;
   
    category.save((err, updatedCategory) => {
        if (err){
            return res.status(400).json({
                err :"Unable to Update"
            });
        }
        res.json(updatedCategory);
    })
};

exports.removeCategory = (req, res) =>{
    const category = req.category;
    category.remove((err, category) =>{
        if (err){
            return res.status(400).json({
                err :"Unable to Remove Category"
            });
        }
        res.json({
            message : "Deleted Succesfully"
        });
    });
}