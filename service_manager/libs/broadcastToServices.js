module.exports = (_nodule, msg) => {
    var request = require('request');
    let serviceCenterConf = require('../conf/conf');
    let url = 'http://' + _nodule.IP + ':' + _nodule.PORT + _nodule.MSG_API
    console.log(url)
    httprequest(url, msg);

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
            console.log(response.statusCode)
            if (!error && response.statusCode == 200) {
                console.log(body) // 请求成功的处理逻辑
            } else {
                console.log(error)
            }
        });
    };
}