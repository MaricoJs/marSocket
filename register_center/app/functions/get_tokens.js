const md5 = require('md5')
const Timestamp = require('mongodb').Timestamp;
module.exports = (fastify, payload) => {
    let jwt = fastify.jwt.sign(payload),
        token = md5(jwt),
        freshToken = md5(jwt + 'marico'),
        timestamp = Date.now(),
        createAt = new Timestamp(timestamp,5),
        createTime = require('../../libs/getDate').getTime(timestamp),
        db_token = {
            userId: payload.userId,
            token: token,
            createAt: createAt,
            createTime: createTime
        },
        db_freshToken = {
            userId: payload.userId,
            token: freshToken,
            jwt: jwt,
            createAt: createAt,
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