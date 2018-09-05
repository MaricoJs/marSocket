const login = require('../functions/login');
const register = require('../functions/register');
const routes = async function (fastify, options) {
    fastify.post('/login', async (req, res) => {
        return await login(fastify, req, res)
    })
    fastify.post('/register', async (req, res) => {
        return await register(fastify, req, res)
    })
    fastify.get('/test', (req, reply) => {
        // some code
        let body = req.headers
        console.log(body)
        let token = body.usertoken
        let res = fastify.jwt.decode(token)
        reply.send(res)
    })


}
module.exports = routes