let setLocalServiceListFromServiceManager = (fastify, opts, next) => {
    let list = {},
        services = {},
        set = (serviceList) => {
            for (let servKey in serviceList) {
                if (serviceList.hasOwnProperty(servKey)) {
                    let curServList = serviceList[servKey]
                    list[serv] = []
                    for (let curServ in curServList) {
                        if (curServList.hasOwnProperty(curServ)) {
                            list[serv].push(curServList[curServ])
                        }
                    }
                }
            }
        },
        setApis = (allServices) => {
            Object.keys(allServices).map((serviceName, index) => {
                if (!services.hasOwnProperty(serviceName)) {
                    services[serviceName] = {
                        apis:allServices[serviceName].APIS
                    }

                }
            })
        }

    next()
}
module.exports = setLocalServiceListFromServiceManager