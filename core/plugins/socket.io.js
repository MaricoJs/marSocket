'use strict'

const fp = require('fastify-plugin')
const websocket = require('socket.io')

module.exports = fp(function (fastify, opts, next) {
  var handle = opts.handle

  // if (typeof handle !== 'function') {
  //   return next(new Error('invalid handle function'))
  // }

  // var ws = websocket.createServer({
  //   server: fastify.server
  // }, handle)

  // fastify.decorate('websocketServer', wss)


  let socketIo = require('socket.io')(fastify.server, {
    path: '/socket.io',
    // serveClient: false,
    // // below are engine.IO options
    // pingInterval: 10000,
    // pingTimeout: 5000,
    // cookie: false

  })
  socketHandler(fastify, socketIo)
  fastify.decorate('scoket', socketIo)
  next()
}, {
  fastify: '>=0.39.0',
  name: 'fastify-websocket'
})

function socketHandler(fastify, socketIo) {
  let count = 0
  socketIo.sockets.on('connection', function (socket) {
    socket.emit('news', {
      hello: 'world'
    });
    socket.on('haode', function (data) {
      console.log(data);
      setTimeout(() => {
        socket.emit('haode', {
          countServer: count++
        })
      }, 1000);
    });
  });
}