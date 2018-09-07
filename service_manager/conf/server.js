module.exports = {
    SERVER_MODULE: 'USER_CENTER',
    ALIAS: 'USER',
    APIS: [{
            name: '/login',
            type: 'post',
            des: 'user login'
        },
        {
            name: '/register',
            type: 'post',
            des: 'user register'
        },
        {
            name: '/token',
            type: 'get',
            des: 'get token by freshTken'
        },
        {
            name: '/verify',
            type: 'get',
            des: 'verify if token is avilable'
        },

    ],
    IP: '127.0.0.1',
    PORT: 3001,
    SCRIPTS: {},
    DEPENDECIES: {}
}