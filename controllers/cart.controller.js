import auth from '../middleware/auth.js'
import prisma from '../config/client.js'
import express from 'express'


class cartController{
 static getCart = async (req,res,next)=>{
    const user = req.user
    try{

        const cart = await prisma.shoppingSession.findMany({
            where:{user_id:user.payload.id},
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
        const calculatedPrice= product.price*req.body.quantity;
        const cart = await prisma.shoppingSession.update({
            where:{
                user_id:Number(user.payload.id)
            },data:{
                totalPrice:{increment:calculatedPrice},
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
    const user= req.user
    
    try {
        const removedItem = await prisma.shoppingSession.update({
            where:{
                user_id:Number(user.payload.id)
            },data:{
                CartItem:{
                    delete:[
                        {
                            id:req.body.id
                        }
                    ]
                }
            }
            
        })

        res.json(removedItem)
        
    } catch (e) {
        console.log(e)
        next(e)
    }
 }


 static updateCart = async (req,res,next)=>{
try {
    const user= req.user
    const updateCart = await prisma.shoppingSession.update({
        where:{
            user_id:Number(user.payload.id)
        },
        data:{
            CartItem:{
            updateMany:{
                where:{id:req.body.id,
                     product_id:req.body.product_id},
                data:{quantity:req.body.quantity}
                
            }
            }
        }
    })

    res.json(updateCart)
} catch (e) {
    console.log(e)
    next(e)
} 

}

}
export default cartController;