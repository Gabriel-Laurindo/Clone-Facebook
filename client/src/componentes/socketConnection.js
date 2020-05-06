import io from 'socket.io-client'




const socket = io('http://localhost:8081')


socket.on('connect_failed', function () {
	document.write("Sorry, there seems to be an issue with the connection!");
})
export default socket
