import express from 'express'
import prisma from '../config/client.js'

class UserController{
    constructor(){
        
    }
       async getUserById(req,res){
            const user = await prisma.user.findUnique({
                where:{
                    id:req.id
                }
        })
        res.json(user);
    }
   }



export default UserController;