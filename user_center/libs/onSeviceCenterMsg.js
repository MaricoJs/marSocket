let setLocalServiceListFromServiceManager = require('./setLocalServiceListFromServiceManager')
let getReturn = require('./getReturn').getReturn
let CODE = require('../conf/conf').RETURN_CODE
let onSeviceCenterMsg = async (fastify, req, res) => {
    let json
    try {
        setLocalServiceListFromServiceManager(fastify, req.body)
        json = getReturn(CODE.SUCCESS, 'set sdk successfully')
        // console.log('i will register')

        // fastify.SERVICES.USER_CENTER.register(null, {
        //     username: 'himairico',
        //     password: 'dsfasghs'
        // }).then(res => {
        //     console.log('res')
        //     console.log(res)
        // }).catch(e => {
        //     console.log('e')
        //     console.log(e)
        // })
        // fastify.SERVICES.USER_CENTER.token('b3db5ed27d9009eee04287b6cb9b6e2a', '').then(res => {
        //     console.log(res)
        // }).catch(e => {
        //     console.log(e)
        // })

    } catch (error) {
        json = getReturn(CODE.FAIL, 'set sdk failded', error)
    }
    return json
}
module.exports = onSeviceCenterMsg