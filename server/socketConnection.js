const Koa = require('koa')
const http = require('http')
const socket = require('socket.io')

const appIO = new Koa()
const server = http.createServer(appIO.callback())
const io = socket(server)



server.listen(8081, '0.0.0.0', () => {
	console.log('run socket')
})

module.exports = io

