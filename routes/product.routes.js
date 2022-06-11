import express from "express";
import prisma from '../config/client.js'
//TODO: IMPLEMENT CONTROLLERS
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
            }
        })
        res.json(product)
    } catch (error) {
        next(error)
    }

    
})

//add product
router.post('/products',async(req,res,next)=>{
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
    res.send({message:'Update product'});
})
//delete product
router.delete('/products/:id',async(req,res,next)=>{
    res.send({message:'Delete single product'});
})
export default router;