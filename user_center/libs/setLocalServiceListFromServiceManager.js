const api2funFactory = require('./apiToFunctionFactory')

let setLocalServiceListFromServiceManager = (fastify, allServices) => {
    let services = {},
        nodes = {}
    Object.keys(allServices).map((serviceName, index) => {
        services[serviceName] = {}
        nodes[serviceName] = []
        //let curService = allServices[serviceName]
        Object.keys(allServices[serviceName]).map((curServChildNodeName, index) => {
            let curNode = allServices[serviceName][curServChildNodeName],
                curApis = curNode.APIS
            nodes[serviceName].push(`${curNode.IP}:${curNode.PORT}`)
            Object.keys(curApis).map(apiName => {
                if (!services[serviceName][apiName]) {
                    services[serviceName][apiName] = async function (token, data, opts) {
                        // console.log('i start')
                        let nodeUrl = nodes[serviceName][0]
                        let funFromApi = api2funFactory(nodeUrl, curApis[apiName].path, curApis[apiName].type)                        
                        return funFromApi(token, data, opts)
                    }
                }
            })

        })

    })


    // console.log(services)
    // console.log(nodes)

    if (fastify.hasDecorator('SERVICES')) {
        fastify.SERVICES = services
    } else {
        fastify.decorate('SERVICES', services)
    }

}
module.exports = setLocalServiceListFromServiceManager