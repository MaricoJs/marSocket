module.exports = {
    SERVER_MODULE: 'USER_CENTER',
    ALIAS: 'USER',
    APIS: {
        login: {
            path: '/login',
            type: 'post',
            des: 'user login'
        },
        register: {
            path: '/register',
            type: 'post',
            des: 'user register'
        },
        token: {
            path: '/token',
            type: 'get',
            des: 'get token by freshTken'
        },
        verify: {
            path: '/verify',
            type: 'get',
            des: 'verify if token is avilable'
        },

    },
    IP: '127.0.0.1',
    PORT: 3000,
    MSG_API: '/on-service-center-msg',
    SCRIPTS: {},
    DEPENDECIES: {}
}