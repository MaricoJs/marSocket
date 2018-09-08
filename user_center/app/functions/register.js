const CODE = require('../../conf/conf').RETURN_CODE;
const getReturn = require('../../libs/getReturn').getReturn;
const getTime = require('../../libs/getDate').getTime;
const md5 = require('md5');
const getTokens = require('../../libs/getTokens')
const register = async (fastify, req, res) => {  
    let json,
        body = req.body,
        payload = {
            username: body.username || '',
            password: body.password || ''
        }
    if (!payload.username || !payload.password) {
        return getReturn(CODE.USERNAME_OR_PASSWORD_INVALID_ERROR, 'username or password is not availabe')

    }
    //try {

        let user = await fastify.DB.fastify__users.findOne({
            username: payload.username
        })
        //console.log(user)
        if (user == null) {
            user = {
                username: payload.username,
                password: md5(payload.password)             
            }
            let userInsertRes = await fastify.DB.fastify__users.insertOne(user)
            // console.log(userInsertRes)
            if (userInsertRes.insertedCount == 1) {
                userInDb = userInsertRes.ops[0]
                //console.log(userInDb)
                let tokens = getTokens(fastify, {
                    username: user.username,
                    password: user.password,
                    userId: userInDb._id
                })
                let saveToken = await fastify.DB.fastify__tokens.insertOne(tokens.db_token)
                let saveFreshToekn = await fastify.DB.fastify__freshTokens.insertOne(tokens.db_freshToken)
                if (saveToken.insertedCount == 1 && saveFreshToekn.insertedCount == 1) {
                    json = getReturn(CODE.SUCCESS, 'register user successfully', {
                        token: tokens.token,
                        freshToken: tokens.freshToken
                    })
                } else {
                    json = getReturn(CODE.DB_INSERT_ERROR, 'saveFailExeption', 'user tokens save failed')
                }
            } else {
                json = getReturn(CODE.DB_INSERT_ERROR, 'save failed')
            }

        } else {
            json = getReturn(CODE.DB_RECORD_EXISTS_ERROR, 'user has already existed')
        }
    // } catch (error) {
    //     json = getReturn(CODE.DB_ERROR, 'DbExeption', error)
    // }
    return json

}
module.exports = register