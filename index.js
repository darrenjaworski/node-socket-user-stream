var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var Twitter = require('twitter');
var apikeys = require('./apikeys');

var client = new Twitter(apikeys);

client.stream('user', {},  function(stream){
    stream.on('data', function(tweet) {
        io.emit('tweet', tweet);
    });

    stream.on('error', function(error) {
        console.log(error);
    });
});

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('a user disconnected');
    });
})

var port = 3000;
http.listen(port, function(){
    console.log('Server is live on localhost:' + port);
})
