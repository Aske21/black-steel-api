import express from "express";
var router=express.Router()
import order from '../controllers/order.controller.js';
import auth from '../middleware/auth.js';


router.get('/checkout', auth, order.getCheckout);

router.get('/checkout/success', auth, order.getCheckoutSuccess);

router.get('/checkout/cancel',auth, order.getCheckoutCancel);

router.get('/orders', auth, order.getOrders);

router.get('/order',auth,order.makeOrder);

export default router;