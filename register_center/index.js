const fastify = require('fastify')({
    logger: true
});
fastify.use(require('cors')())
fastify.register(require('fastify-jwt'), {
    secret: 'supersecret'
})
fastify.register(require('fastify-mongodb'), {
    // force to close the mongodb connection when app stopped
    // the default value is false
    forceClose: true,
    useNewUrlParser: true,
    url: require('./conf/conf').MONGODB_URL
})
fastify.register(require('./libs/register_db'), {
    dbs: {
        fastify: ['freshTokens', 'tokens', 'users']
    }
})
fastify.register(require('./app/routes/router'))
fastify.ready().then(() => {
    fastify.listen(3000, err => {
        if (err) throw err
    })
})