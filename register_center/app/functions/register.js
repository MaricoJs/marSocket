const CODE = require('../../conf/conf').RETURN_CODE;
const getReturn = require('../../libs/getReturn').getReturn;
const getTime = require('../../libs/getDate').getTime;
const md5 = require('md5');
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
    let user =await fastify.DB.fastify__users.findOne({
        username: payload.username
    })
    console.log(user)
    if (user == null) {
        user = {
            username: payload.username,
            password: md5(payload.password),
            createAt: Date.now(),
            createTime: getTime()
        }
        let userInsertRes =await fastify.DB.fastify__users.insertOne(user)
        console.log(userInsertRes)
        if(userInsertRes.insertedCount==1){
            userInDb = userInsertRes.ops[0]
            console.log(userInDb)
        }else{
            json = getReturn(CODE.DB_INSERT_ERROR,'save failed')
        }
       
    } else {
        json = getReturn(CODE.DB_RECORD_EXISTS_ERROR, 'user has already existed')
    }
    return json

}
module.exports = register