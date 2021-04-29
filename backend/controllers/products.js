const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");


exports.getProductById = (req, res, next, id) =>{
    Product.findById(id)
    .exec((err , product)=>{
        if(err){
            return res.status(400).json({
                err: "No Product Found"
            });
        }
        req.product = product;
        next();
    });
}

exports.createProduct = (req, res) =>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, file)=>{
        if(err){
            return res.status(400).json({
                err: "Error In image"
            }); 
        }
        // destructure the fields
        const {name, description, price, category, stock} = fields;
        
        // putting restriction on saving the product
        if ( !name || !description || !price || !category || !stock ){
            return res.status(400).json({
                error : "All Fields Are Necessary"
            });
        }

        //todo passing fields 
        let product = new Product(fields);
        
        //handling the file
        if (file.image){
            
            if(file.image.size > 3000000){
                return res.status(400).json({
                    error : "File Size Too Big...."
                });
            }
            product.image.data= fs.readFileSync(file.image.path);
            product.image.contentType = file.image.type;
        }

        //saving photo in DB
        product.save((err, products)=>{
            if(err){
                return res.status(400).json({
                    err: "Unable to save Tshirt"
                }); 
            }
            res.json(products);
        });
    });
}    

exports.getProduct = (req, res) =>{
    req.product.image.data = undefined;
    return res.json(req.product);
}

exports.deleteProduct = (req, res)=>{
    let product = req.product;
    product.remove((err, deletedProduct)=>{
        if(err){
            return res.status(400).json({
                err: "Unable to Delete Product"
            });
        }
        res.json({
            Message : "Delete Successfully",
        });
    });
}

exports.updateProduct = (req, res) =>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, file)=>{
        if(err){
            return res.status(400).json({
                err: "Error In image"
            }); 
        }

        //todo passing fields 
        let product = req.product;
        product = _.extend(product, fields);
        
        //handling the file
        if (file.image){
            
            if(file.image.size > 3000000){
                return res.status(400).json({
                    error : "File Size Too Big...."
                });
            }
            product.image.data= fs.readFileSync(file.image.path);
            product.image.contentType = file.image.type;
        }

        //saving photo in DB
        product.save((err, products)=>{
            if(err){
                return res.status(400).json({
                    err: "Unable to Update Data"
                }); 
            }
            res.json(products);
        });
    });
}

//listing all products
exports.getAllProducts = (req, res)=>{
    let limit = req.query.limit ? parseInt(req.query.limit) : 10
    let sortBy = req.query.sortBy ? req.query.limit : "_id"
    Product.find()
            .select("-image")
            .populate("Category")
            .sort([[sortBy, "asc"]])
            .limit(limit)  
            .exec((err, products) =>{
                if(err){
                    return res.status(400).json({
                        err: "No Products Found"
                    });
                }
                res.json(products)
            }); 
}

exports.getAllUniqueCategory = (req, res) =>{
    Product.distinct("Category", {}, (err, category)=>{
        if(err){
            return res.status(400).json({
                err: "No Category Found"
            });
        }
        res.json({category});
    })
}

//middleware
exports.photo = (req, res, next)=>{
    if(req.product.image.data){
        res.set("Content-Type", req.product.image.contentType);
        return res.send(req.product.image.data)
    }
    next();
}

exports.updateStock = (req, res, next) =>{
    let update = req.body.order.products.map(prod =>{
        return{
            updateOne: {
                filter: {_id: prod._id},
                update: {$inc: {stock: -prod.count ,sold: +prod.count}}
            }
        }
    });

    Product.bulkWrite(update, {}, (err, product)=>{
        if(err){
            res.status(400).json({
                Error : "Bulk Operation Failed"
            });
        }
        next();
    });
}

