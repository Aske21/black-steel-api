import auth from '../middleware/auth.js'
import prisma from '../config/client.js'
import express from 'express'

class cartController{
 static getCart = async (req,res,next)=>{
    const user = req.user
    try{

        const cart = await prisma.shoppingSession.findMany({
            where:{user_id:user.id},
            include:{
                CartItem:{
                include:{Product:true}
            }}
        });
        res.json(cart)
     }catch(e){
         console.log(e)
        next(e)
     }
 }

 static addToCart = async  (req,res,next)=>{
     const user = req.user
     
     try {
        const product = await prisma.product.findUnique({
            where:{
                id:req.body.product_id
            }
        })
        console.log(product.price)
        const cart = await prisma.shoppingSession.update({
            where:{
                user_id:Number(user.payload.id)
            },data:{
                totalPrice:{increment:product.price},
                CartItem:{
                    create:[
                        {
                            quantity:req.body.quantity,
                            product_id:req.body.product_id
                        }
                    ]
                }

            },    
        });
         
        res.json(cart)
     } catch (e) {
         console.log(e)
         next(e)
     }
 }
 static removeFromCart = async (req,res,next)=>{

 }
 static updateCart = async (req,res,next)=>{
     
 }

}
export default cartController;