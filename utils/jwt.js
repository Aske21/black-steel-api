import jwt from 'jsonwebtoken'
import createError from 'http-errors'

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET



class jwtUtil{

 verifyAccessToken = (token) =>{
        return new Promise((resolve, reject) => {
            jwt.verify(token, accessTokenSecret, (err, payload) => {
                if (err) {
                    const message = err.name == 'JsonWebTokenError' ? 'Unauthorized' : err.message
                    return reject(createError.Unauthorized(message))
                }
                resolve(payload)
            })
        }
        )
}
    
  signAccessToken = (payload) =>{
        return new Promise((resolve, reject) => {
            jwt.sign({ payload }, accessTokenSecret, {
            }, (err, token) => {
                if (err) {
                reject(createError.InternalServerError())
                }
                resolve(token)
            })
        })
    }
}

export default new jwtUtil();