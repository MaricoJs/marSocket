const CODE = require('../../conf/conf').RETURN_CODE;
const getReturn = require('../../libs/getReturn').getReturn;
const getTime = require('../../libs/getDate').getTime;
const md5 = require('md5');
const getTokens = require('./get_tokens');
const get_id = require('mongodb').ObjectId;


const login = async (fastify, req, res) => {
    let json,
        body = req.body,
        payload = {
            username: body.username || '',
            password: md5(body.password) || ''
        }
    if (!payload.username || !payload.password) {
        return getReturn(CODE.USERNAME_OR_PASSWORD_INVALID_ERROR, 'username or password is not availabe')
    }
    let user = await fastify.DB.fastify__users.findOne(payload)
    if (user == null) {
        return getReturn(CODE.DB_NO_RECORD_ERROR, 'user not exists')
    } else if (user.username == payload.username && user.password == payload.password) {
        payload.userId = user._id
    }
    let tokens = getTokens(fastify, payload)
    let freshToken_in_db = await fastify.DB.fastify__freshTokens.findOne({
        userId: payload.userId
    })
    try {
        if (freshToken_in_db == null) {
            let insertFreshToken = await fastify.DB.fastify__freshTokens.insert(tokens.db_freshToken)
        } else {
            tokens.freshToken = freshToken_in_db.token
        }
        let updateToken = await fastify.DB.fastify__tokens.updateOne({
            userId: payload.userId
        }, {
            $set: tokens.db_token
        }, {
            upsert: true
        });
        json = getReturn(CODE.SUCCESS, 'login success', {
            token: tokens.token,
            freshToken: tokens.freshToken
        })
        return json
    } catch (error) {
        json = getReturn(CODE.FAIL, 'login failed', error)
        return json
    }
}
module.exports = login