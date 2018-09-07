const login = require('../functions/login');
const register = require('../functions/register');
const getTokenByFreshToken = require('../functions/getTokenByFreshToken');
const verifyToken = require('../functions/verifyToken');
const onSeviceCenterMsg = require('../../libs/onSeviceCenterMsg');
const routes = async function (fastify, options) {
    fastify.post('/login', async (req, res) => {
        return await login(fastify, req, res)
    })
    fastify.post('/register', async (req, res) => {
        return await register(fastify, req, res)
    })
    fastify.get('/token', async (req, res) => {
        return await getTokenByFreshToken(fastify, req, res)
    })
    fastify.get('/verify', async (req, res) => {
        return await verifyToken(fastify, req, res)
    })
    fastify.post('/on-service-center-msg', async (req, res) => {
        return await onSeviceCenterMsg(fastify, req, res)
    })
    fastify.get('/', async (req, reply) => {
        // some code
        reply.send('hello , I am Marico')
    })
    fastify.get('/test', (req, reply) => {
        // some code
        let body = req.headers
        console.log(body)
        let token = body.usertoken
        let res = fastify.jwt.verify(token)
        reply.send(res)
    })
}
module.exports = routes