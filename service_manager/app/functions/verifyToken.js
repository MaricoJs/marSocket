const CODE = require('../../conf/conf').RETURN_CODE;
const getReturn = require('../../libs/getReturn').getReturn;
const verifyToken = async (fastify, req, res) => {
    let json,
        token = req.headers.token
    let token_in_db = await fastify.DB.fastify__tokens.findOne({
        token: token
    })
    if (token_in_db == null) {
        json = getReturn(CODE.FAIL, 'is not avilable')
    } else {
        json = getReturn(CODE.SUCCESS, 'is avilable')
    }
    return json
}
module.exports = verifyToken