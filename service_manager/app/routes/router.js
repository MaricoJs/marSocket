const register = require('../functions/register');
const routes = async function (fastify, options) {
    fastify.post('/register-service', async (req, res) => {
        return await register(fastify, req, res)
    })
    fastify.get('/test', (req, reply) => {
        reply.send({
            hello: 'i am Marico'
        })
    })
}
module.exports = routes