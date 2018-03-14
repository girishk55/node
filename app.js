
/**
 * Module dependencies.
 */
var express  = require('express');
var connect = require('connect');

var app      = express();



						// create our app w/ express
//var mongoose = require('mongoose'); 				// mongoose for mongodb
//var database = require('./config/database'); 			// load the database config
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// configuration ===============================================================
//mongoose.connect(database.localUrl); 	// Connect to local MongoDB instance. A remoteUrl is also available (modulus.io)

app.use(express.static('./public')); 		// set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
//app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
//app.use(bodyParser.json()); // parse application/json

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request


var server = require('http').createServer(app);
var port     = process.env.PORT || 8088;

// Initializing Socket for Raspbary PI & connection on SerialPort
//var io = require('socket.io').listen(server);
//var SerialPort = require("serialport").SerialPort
//var SerialPort = require("serialport");

//Connect Raspberry Pi to SerialPort

//LINUX user
//var serialPort = new SerialPort("/dev/ttyACM0", { baudrate: 115200 });

/*
// Windows User
var serialport = new SerialPort("COM1", {
	baudrate: 9600 //9600
});
*/

/* ******************* */
// Send Data to socket
 /* ******************* */
 /*
io.sockets.on('connection', function (socket) {
        socket.on('led', function (data) {
               brightness = data.value;
               
                var buf = new buffer(1);
                buf.writeuint8(brightness, 0);
                serialport.write(buf);
               
                io.sockets.emit('led', {value: brightness});   
        });
       
         socket.emit('led', {value: brightness});
});
*/
/* ******************* */
// Reading from Port
/* ******************* */
/*
serialport.on("open", function () {
    console.log('open');
    serialport.on('data', function(data) {
    console.log(data);
   });
});

*/

// Configuration
app.use(express.static(__dirname + '/public'));
app.use(connect.logger('dev'));
app.use(connect.json());  
app.use(connect.urlencoded());

// Routes

require('./routes/routes.js')(app);

//app.listen(port);
server.listen(port);
console.log('The App runs on port ' + port);
