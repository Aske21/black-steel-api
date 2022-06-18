import auth from '../middleware/auth.js'
import prisma from '../config/client.js'
import express from 'express'
import createError from 'http-errors';
import { HttpError } from 'http-errors';


class orderController {

//get current user orders
static getOrders = async(req,res,next)=>{
    const user=req.user
 
    try {
        const orders = await prisma.orderDetails.findMany({
            where:{user_id:user.payload.id},
            include:{
                OrderItems:true}
        });
        res.json(orders)
        
    } catch (e) {
        console.log(user)
        next(createError.NotFound("User Order was not found"))
        
    }

}

//process order
static getCheckout = async(req,res,next)=>{}

//return order info for succssesful checkout
static getCheckoutSuccess = async(req,res,next)=>{}

//cancel order and remove from backlog
static getCheckoutCancel = async(req,res,next)=>{}


//convert cart to order and display order details
static makeOrder = async(req,res,next)=>{
    const user = req.user;

    try{
    //get user cart items 
    let id=user.payload.id;    
    const cart = await prisma.shoppingSession.findMany({where:{user_id:id}});
    const cartItems = await prisma.cartItem.findMany({
        where:{session_id:cart.session_id}
    });

  

   
    //create order
    const order=await prisma.orderDetails.upsert({
        where:{
            user_id:user.payload.id
        },
        update:{},
        create:{
            user_id:user.payload.id,
            total:0,        
        }
    })
    //convert cart items into order items

    for(let item of cartItems){

    const orderItem = await prisma.orderItems.upsert({

        where:{
            product_id:item.product_id,
        },
        update:{quantity:item.quantity},
        create:{
            order_id:order.id,
            product_id:item.product_id,
            quantity:item.quantity,
       
        
        }
    })
}
    //return order
    const finalizedOrder = await prisma.orderDetails.findMany({
        where:{
            user_id:user.payload.id,
        },
        include:{OrderItems:true}
        
    })
    res.json(finalizedOrder)
    }catch(e){
        next(e)
    }

}
}


export default orderController;