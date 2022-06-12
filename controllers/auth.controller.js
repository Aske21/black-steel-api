import auth from '../services/auth.service.js';
import createError from 'http-errors';
class authController {
    static register = async (req, res, next) => {
        try {
            const user = await auth.register(req.body);

            res.json({
                data: user
            })
        }
        catch (e) {
            next(createError.NotAcceptable(e.message))
        }
    }
    static login = async (req, res, next) => {
         try {
            const data = await auth.login(req.body)
            res.status(200).json({
                status: true,
                message: "Account login successful",
                data
            })
        } catch (e) {
            next(createError(e.message))
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