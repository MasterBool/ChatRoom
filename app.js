var express=require('express'),
	path=require('path'),
	http=require('http');

var app=express(),
	server=http.createServer(app),
	io=require('socket.io').listen(server);

io.on('connection', function(socket)
{
	socket.emit('open');

	socket.on('message', function(msg)
	{
		socket.emit('system', msg);
		socket.broadcast.emit('system', msg);
		console.log(msg.author+': '+msg.content);
	});
});

app.set('port', 80);
app.set('views', __dirname+'./views');
app.use(express.static(path.join(__dirname, './public')));

app.get('/', function(req, res){
	res.sendfile('./views/index.html');
});

server.listen(app.get('port'), function(){
	console.log('Node.js server is running on port: '+ app.get('port'));
});

function getTime(){
	var myDate=new Date(),
	str=myDate.getHours()+':'+myDate.getMinutes();
	return str;
}

function getColor(){
	return	'#'+(parseInt( Math.random() * Math.pow(2,24) ) ).toString(16);
}
