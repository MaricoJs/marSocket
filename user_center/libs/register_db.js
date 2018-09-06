const fp = require('fastify-plugin')
function decorateDb(fastify, dbInfo, next) {
    let dbs = {}
    let dbs_param = dbInfo.dbs || null
    if (dbInfo && dbs_param && typeof dbs_param == 'object') {
        for (const dbname in dbs_param) {
            if (dbs_param.hasOwnProperty(dbname)) {
                let list = dbInfo.dbs[dbname]
                for (const collection of list) {
                    dbs[`${dbname}__${collection}`] = fastify.mongo.client.db(dbname).collection(collection)
                }
            }
        }
        fastify.decorate('DB', dbs)
    }
    next()
}
module.exports = fp(decorateDb);