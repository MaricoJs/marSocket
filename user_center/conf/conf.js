module.exports.RETURN_CODE = {
    SUCCESS: 1, //success
    FAIL: 0, //fail
    DB_ERROR: -1, //db connection error
    DB_FIND_ERROR: -10,
    DB_INSERT_ERROR: -11,
    DB_UPDATE_ERROR: -12,
    DB_DEL_ERROR: -13,
    DB_NO_RECORD_ERROR: -14, //no such record in db
    DB_STATE_ERROR: -15,
    DB_CONN_ERROR: -16,
    DB_RECORD_EXISTS_ERROR: -17, //the record has already existed
    INFO_MATCH_ERROR: -2, //info not match
    USERNAME_OR_PASSWORD_INVALID_ERROR: -3,
}
module.exports.MONGODB_URL = 'mongodb://home.nongshiye.com/fastify'
module.exports.TOKEN_EXPIRE = 7200 * 1000
module.exports.FRESH_TOKEN_EXPIRE = 2 * 30 * 24 * 3600 * 1000
module.exports.SERVICE_CENTER_IP = "127.0.0.1"
module.exports.SERVICE_CENTER_PORT = 3001