import auth from '../services/auth.service.js';
import createError from 'http-errors';

class authController {
    static register = async (req, res, next) => {
        try {
            const user = await auth.register(req.body);

            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            res.header("Access-Control-Allow-Origin","https://black-steel.herokuapp.com");
            res.header("Access-Control-Allow-Origin","http://localhost/");
            
            res.header("Access-Control-Allow-Credentials","true");
            
            
            res.header('Authorization','Bearer= '+ user.accessToken,{HttpOnly:true, Path:'/', sameSite: 'none', secure: true})
            
            res.cookie("Bearer",user.accessToken,{ sameSite: 'none', secure: true })
             console.log(res.cookie)
            res.status(200).json({
                status: true,
                message: "Account succsessfully registered",
                user
            })
        }
        catch (e) {
            res.status(500).json({
                message:e.message
            })
        }
    }
    static login = async (req, res, next) => {
         try {
            const data = await auth.login(req.body)
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            res.header("Access-Control-Allow-Origin","http://localhost:3000");
            res.header("Access-Control-Allow-Credentials","true");
            
            
            res.header('Authorization','Bearer= '+ data.accessToken,{HttpOnly:true, Path:'/', sameSite: 'none', secure: true})
            
            res.cookie("Bearer",data.accessToken,{ sameSite: 'none', secure: true })
             console.log(res.cookie)
            res.status(200).json({
                status: true,
                message: "Account login successful",
                data
            })
            
        } catch (e) {
            
            res.status(500).json({
                message:e.message
            })
            
        }
    }
    static all = async (req, res, next) => {
        try {
            const users = await auth.all();
            res.status(200).json({
                status: true,
                message: 'All users',
                data: users
            })
        }
        catch (e) {
            next(createError(e.statusCode, e.message))
        }
    }
}
export default authController;