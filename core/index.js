const fastify = require('fastify')({
    logger: true,
    //http2: true
});
const path = require('path')

const serveStatic = require('serve-static')
fastify.use('/html', serveStatic(path.join(__dirname, '/html')))
//socketIo.emit('hi',{hello:'world'})
fastify.get('/', async (req, res) => {
    return 'hello web'
})
fastify.register(require('./plugins/socket.io'))
fastify.listen(8899).then(()=>{
    console.log( fastify.server)
})
// const socketIo = require('socket.io')(fastify.server,{
//     path: '/socket.io',
//     // serveClient: false,
//     // // below are engine.IO options
//     // pingInterval: 10000,
//     // pingTimeout: 5000,
//     // cookie: false

// })
// let count = 0
// socketIo.sockets.on('connection', function (socket) {
//     socket.emit('news', {
//         hello: 'world'
//     });
//     socket.on('haode', function (data) {
//         console.log(data);
//         setTimeout(() => {
//             socket.emit('haode',{countServer:count++})
//         }, 1000);
//     });
// });