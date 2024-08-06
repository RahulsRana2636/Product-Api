const express = require('express');
const Product = require('../Schemas/Product');
const router = express.Router();
const { body, validationResult } = require('express-validator');
var fetchuser = require('../middleware/fetchUser');

// Route 1: Create a new product using: POST "http://localhost:5000/product/add-product".
router.post("/add-product", fetchuser, async (req, resp) => {
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
});

// Route 2: Fetch all product form db using: GET "http://localhost:5000/product/products".
router.get("/products", async (req, resp) => {
    const products = await Product.find();
    if (products.length > 0) {
        resp.send(products)
    } else {
        resp.send({ result: "No Product found" })
    }
});

// Route 3: Update a product using: PUT "http://localhost:5000/product/updateproduct/:id".
router.put("/updateproduct/:id", fetchuser, async (req, resp) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    resp.send(result)
});

// Route 4: Delete a product using: Delete "http://localhost:5000/product/deleteproduct/:id".
router.delete("/deleteproduct/:id", fetchuser, async (req, resp) => {
    let result = await Product.deleteOne({ _id: req.params.id });
    resp.send(result)
})

// Route 5: get a product using: GET "http://localhost:5000/product/getproduct/:id".
 router.get("/getproduct/:id", fetchuser, async (req, resp) => {
        let result = await Product.findOne({ _id: req.params.id })
        if (result) {
            resp.send(result)
        } else {
            resp.send({ "result": "No Record Found." })
        }
    })

// Route 5: search products using filter using: GET "http://localhost:5000/product/search/:key".
router.get("/search/:key", fetchuser, async (req, resp) => {
    let result = await Product.find({
        "$or": [
            {
                name: { $regex: req.params.key }  
            },
            {
                company: { $regex: req.params.key }
            },
            {
                category: { $regex: req.params.key }
            },
            {
                price : { $regex: req.params.key }
            }
        ]
    });
    resp.send(result);
})

module.exports = router