
const express = require('express');
const Cart = require('../Schemas/CartProduct');
const router = express.Router()
var fetchuser = require('../middleware/fetchUser');

// Route to add a product to the cart
router.post("/add-to-cart", fetchuser, async (req, res) => {
    try {
        const cartItem = new Cart(req.body);
        const result = await cartItem.save();
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send({ result: "Internal server error" });
    }
});

router.get("/view-cart/:userId", fetchuser, async (req, res) => {
    try {
        const cartItems = await Cart.find({ userId: req.params.userId });
       res.send(cartItems);
    } catch (error) {
        console.error(error);
        res.status(500).send({ result: "Internal server error" });
    }
});


router.delete("/remove-from-cart/:id", fetchuser, async (req, res) => {
    try {
        const result = await Cart.deleteOne({ _id: req.params.id });
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ result: "Internal server error" });
    }
});

// Route to update the quantity of a product in the cart
router.put("/update-quantity/:productId", fetchuser, async (req, res) => {
    const { quantity } = req.body;
  
    if (quantity < 1) {
      return res.status(400).send({ result: "Quantity must be at least 1" });
    }
  
    try {
      const cartItem = await Cart.findOne({ _id: req.params.productId, userId: req.user.id });
  
      if (!cartItem) {
        return res.status(404).send({ result: "Product not found in cart" });
      }
  
      cartItem.quantity = quantity;
      await cartItem.save();
  
      res.status(200).send({ result: "Quantity updated successfully", cartItem });
    } catch (error) {
      console.error(error);
      res.status(500).send({ result: "Internal server error" });
    }
  });
module.exports = router