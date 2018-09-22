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
fastify.ready().then(async () => {
    let startStatus = await fastify.listen(require('./conf/server').PORT,'0.0.0.0')
    console.log(startStatus)
    require('./libs/regToServiceCenter')()
})