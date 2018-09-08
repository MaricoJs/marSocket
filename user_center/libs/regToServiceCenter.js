module.exports = () => {
    var request = require('request');
    let serviceCenterConf = require('../conf/conf');
    let url = 'http://' + serviceCenterConf.SERVICE_CENTER_IP + ':' + serviceCenterConf.SERVICE_CENTER_PORT + '/register-service'
    console.log(url)
    httprequest(url, require('../conf/server'));

    function httprequest(url, data) {
        request({
            url: url,
            method: "POST",
            json: true,
            headers: {
                "content-type": "application/json",
            },
            body: data
        }, function (error, response, body) {
            console.log('response.statusCode: ' + response.statusCode)
            if (!error && response.statusCode == 200) {
                console.log(body) // 请求成功的处理逻辑
            } else {
                console.log(error)
            }
        });
    };
}