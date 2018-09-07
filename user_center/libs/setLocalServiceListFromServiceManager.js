let setLocalServiceListFromServiceManager = (fastify, opts, next) => {
    let list ={},
        set = (services) => {
            serviceList = services
            for (let servKey in services) {
                if (services.hasOwnProperty(servKey)) {
                    let curServList =  services[servKey]
                  list[serv] = []
                  let curServArr =[] 
                    for (let curServ in curServList) {
                        if (curServList.hasOwnProperty(curServ)) {
                            curServArr.push(curServList[curServ])
                        }
                    }
                }
            }
        }
    next()
}
module.exports = setLocalServiceListFromServiceManager