import express from "express";
var router=express.Router()
import cart from '../controllers/cart.controller.js';
import auth from '../middleware/auth.js';

router.get('/cart', auth, cart.getCart);

router.patch('/cart', auth, cart.addToCart);

//router.post('/cart-delete-item', isAuth, shopController.postCartDeleteProduct);

export default router;