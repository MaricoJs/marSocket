module.exports.getReturn = function (code, message, extra) {
    let json = {
        statusCode: code,
        message: message
    }
    if (code > 0) {
        json.data = extra || {}
    } else {
        json.error = extra || ''
    }
    return json;
}
