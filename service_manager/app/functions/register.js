const CODE = require('../../conf/conf').RETURN_CODE;
const getReturn = require('../../libs/getReturn').getReturn;
const getTime = require('../../libs/getDate').getTime;
const md5 = require('md5');

const register = async (fastify, req, res) => {
    let json = 'hello world',
        service = req.body
    fastify.SERVICES.add(service).broadcast()
    return json

}
module.exports = register