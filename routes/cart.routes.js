import express from "express";
var router=express.Router()
import cart from '../controllers/cart.controller.js';
import auth from '../middleware/auth.js';

router.get('/cart', auth, cart.getCart);

router.patch('/cart', auth, cart.addToCart);

router.delete('/cart',auth,cart.removeFromCart)

router.post('/cart',auth,cart.updateCart)

export default router;