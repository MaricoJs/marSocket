const fp = require('fastify-plugin')
const broadcastToServices = require('../libs/broadcastToServices')
const md5 = require('md5');

function decorateServiceList(fastify, opts, next) {
    let list = {},
        add = (server) => {
            if (!list[server.SERVER_MODULE]) {
                list[server.SERVER_MODULE] = {}
            }
            let server_key = md5(server);
            if (!list[server.SERVER_MODULE].hasOwnProperty(server_key)) {
                list[server.SERVER_MODULE][server_key] = server
            }
            console.log(list)
            broadcast()
        },
        broadcast = () => {
            for (let _module_name in list) {
                if (list.hasOwnProperty(_module_name)) {
                    let _moduleOjb = list[_module_name];
                    for (let _module in _moduleOjb) {
                        if (_moduleOjb.hasOwnProperty(_module)) {
                            broadcastToServices(_moduleOjb[_module], list)
                        }
                    }
                }
            }
        }
    fastify.decorate('SERVICES', {
        list,
        add,
        broadcast
    })
    next()
}
module.exports = fp(decorateServiceList);