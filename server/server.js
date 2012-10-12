
var express = require('express');
var app = express();
//var app = express.createServer();
var port = process.env.PORT || 8000;
var http = app.listen(port);
var socketio = require('socket.io').listen(http);
app.configure(function(){
	app.use(express.static(__dirname + '/..'));
});

app.get('/', function(req, res) {
	res.render('index', {});
});


socketio.on('connection', function (socket) {
	console.log('connected');
	socket.emit('msg push', {msg:'connected'});
	
	socket.on('all', function(msg){
		socketio.sockets.emit('msg', msg);
	});
	
	socket.on('disconnect', function(){
		console.log('disconnect');
	});
});

