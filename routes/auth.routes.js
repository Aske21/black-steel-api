import express from "express";
var router=express.Router()
import user from '../controllers/auth.controller.js';
import auth from '../middleware/auth.js';

// register
router.post('/', user.register);
// login
router.post('/login', user.login);


export default router;