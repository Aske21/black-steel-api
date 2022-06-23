import express from "express";
import prisma from '../config/client.js'
import auth from "../middleware/auth.js";
//TODO: IMPLEMENT CONTROLLERS; ADD MANY TO MANY RELATIONSHIP FOR PRODUCT AND CATEGORY WITH EXPLICIT RELATION
var router=express.Router()

//get all products route
router.get('/products',async(req,res,next)=>{
    try{
        const products = await prisma.product.findMany({
            include:{categories:true},
        });
        res.json(products)
    }catch(error){
        next(error)
    }
})
//get product by id
router.get('/products/:id',async(req,res,next)=>{

    try {
        //ADD PARAM VALIDATION
        const {id}=req.params
        const product = await prisma.product.findUnique({
            where:{
                id:Number(id)
            },
            include:{categories:true}
        })
        res.json(product)
    } catch (error) {
        next(error)
    }

    
})
//get products by category id
router.get('/products/category/:cid',async(req,res,next)=>{

    try {
        //ADD PARAM VALIDATION
        const {cid}=req.params
        const product = await prisma.product.findMany({
            where:{
                category_id:Number(cid)
            },
            include:{categories:true}
        })
        res.json(product)
    } catch (error) {
        next(error)
    }
})
//TODO: ADD AUTHENTICATION AND ADMIN ONLY PERMISSIONS

//add product
router.post('/products',auth,async(req,res,next)=>{
    try {
        const product = await prisma.product.create({
                data:{
                    name:req.body.name,
                    description:req.body.description,
                    price:req.body.price,
                    brand:req.body.brand,
                    category_id:req.body.category_id,
                    no_in_stock:req.body.no_in_stock,
                    img:req.body.img

                }
            }
        )
        res.json(product)
    } catch (error) {
        next(error)
    }
    
})
//update product
router.patch('/products/:id',async(req,res,next)=>{
    try {
        //ADD PARAM VALIDATION
        const {id}=req.params
        const product = await prisma.product.update({
            where:{
                id:Number(id)
            },
            data:req.body,
            include:{categories:true}
        })
        res.json(product)
    } catch (error) {
        next(error)
    }
})

//delete product
router.delete('/products/:id',async(req,res,next)=>{
    
    try {
        //ADD PARAM VALIDATION
        const {id}=req.params
        const deletedProduct = await prisma.product.delete({
            where:{
                id:Number(id)
            }
        })
        res.json(product)
    } catch (error) {
        next(error)
    }


})
export default router;