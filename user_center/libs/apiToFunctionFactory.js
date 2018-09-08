const request = require('request');
const getReturn = require('./getReturn').getReturn
const CODE = require('../conf/conf').RETURN_CODE
let api2funFactory = (url, path, method) => {
    return async (token, data, opts) => {
        let uri = `http://${url}${path}`
        let reqOpt = {
            url: uri,
            method: method.toUpperCase(),
            json: true,
            headers: {
                "content-type": "application/json",
                token: token || ''
            },
            body: data
        }
        return new Promise((resolve, reject) => {
            request(reqOpt, function (err, res, body) {
                if (err) reject(getReturn(CODE.FAIL, 'request err', err))
                if (res.statusCode != 200) reject(getReturn(CODE.FAIL, 'request err', 'statusCode:' + res.statusCode))
                resolve(body)

            });
        })

    }
}

module.exports = api2funFactory