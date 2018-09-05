const md5 = require('md5')
const Timestamp = require('mongodb').Timestamp;
module.exports = (fastify, payload) => {
    let jwt = fastify.jwt.sign(payload),
        token = md5(jwt),
        freshToken = md5(jwt + 'marico'),
        timestamp = Date.now(),       
        createTime = require('../../libs/getDate').getTime(timestamp),
        db_token = {
            userId: payload.userId,
            token: token,
            expireAt: new Date(timestamp + require('../../conf/conf').TOKEN_EXPIRE),
            createTime: createTime
        },
        db_freshToken = {
            userId: payload.userId,
            token: freshToken,
            jwt: jwt,
            expireAt: new Date(timestamp + require('../../conf/conf').FRESH_TOKEN_EXPIRE),
            createTime: createTime
        }
    return {
        jwt,
        token,
        freshToken,
        db_token,
        db_freshToken
    }
}