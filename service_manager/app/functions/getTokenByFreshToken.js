const CODE = require('../../conf/conf').RETURN_CODE;
const getReturn = require('../../libs/getReturn').getReturn;
const getTokens = require('../../libs/getTokens');
const get_id = require('mongodb').ObjectId;
const getTokenByFreshToken = async (fastify, req, res) => {
    let json,
        body = req.headers,
        freshToken = body.freshtoken
   // try {

        let freshToken_in_db = await fastify.DB.fastify__freshTokens.findOne({
            token: freshToken
        })
        if (freshToken_in_db != null) {
            let userInfo = fastify.jwt.verify(freshToken_in_db.jwt);
            delete userInfo.iat
            //console.log(userInfo)
            let tokens = getTokens(fastify, userInfo)
            let updateToken = await fastify.DB.fastify__tokens.updateOne({
                userId: get_id(userInfo.userId)
            }, {
                $set: tokens.db_token
            }, {
                upsert: true
            });
            //console.log(updateToken.result)
            if (updateToken.result.ok == 1 && updateToken.result.n == 1) {
                json = getReturn(CODE.SUCCESS, 'get token ok', {
                    token: tokens.token
                })
            } else {
                json = getReturn(CODE.DB_UPDATE_ERROR, 'DbUpdateErrorExepiton', 'new token save failed')
            }

        } else {
            json = getReturn(CODE.DB_NO_RECORD_ERROR, 'DbNotFoundExeption', 'freshToken expires or not exists')
        }
    // } catch (error) {
    //     json = getReturn(CODE.DB_ERROR,'Db action failed',error)
    // }
    return json

}
module.exports = getTokenByFreshToken