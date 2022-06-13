import createError from 'http-errors';
import jwt from '../utils/jwt.js'
import cookieParser from 'cookie-parser';

const auth = async (req, res, next) => {

    var cookies = cookieParser();    
    console.log(req.cookies)

    if (!req.cookies) {
        return next(createError.Unauthorized('Access token is required'))
    }
    const token = req.cookies['Bearer']
    if (!token) {
        return next(createError.Unauthorized())
    }
    await jwt.verifyAccessToken(token).then(user => {
        req.user = user
        next()
    }).catch (e => {
        next(createError.Unauthorized(e.message))
    })
}
export default auth;