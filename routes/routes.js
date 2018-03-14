var chgpass = require('config/chgpass');
var register = require('config/register');
var login = require('config/login');
var senddata = require('config/senddata');
var Temp = require('./models/temp');

function getTemps(res) {
    Temp.find(function (err, temps) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(temps); // return all todos in JSON format
    });
};

module.exports = function(app) {

	app.get('/', function(req, res) {
		 res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
	
	app.post('/login',function(req,res){
		
		var email = req.body.email;
        var password = req.body.password;

		login.login(email,password,function (found) {
			console.log(found);
			res.json(found);
	    });
	});


	app.post('/register',function(req,res){
		var email = req.body.email;
		var name = req.body.name;
        var password = req.body.password;
			
		register.register(name,email,password,function (found) {
			console.log(found);
			res.json(found);
	});		
	});
	

	app.post('/api/chgpass', function(req, res) {
		var id = req.body.id;
                var opass = req.body.oldpass;
		var npass = req.body.newpass;

		chgpass.cpass(id,opass,npass,function(found){
			console.log(found);
			res.json(found);
	});	
	});


	app.post('/api/resetpass', function(req, res) {
	
		var email = req.body.email;
		
		chgpass.respass_init(email,function(found){
			console.log(found);
			res.json(found);
	});		
	});
	

	app.post('/api/resetpass/chg', function(req, res) {
	
		var email = req.body.email;
		var code = req.body.code;
		var npass = req.body.newpass;
		
		chgpass.respass_chg(email,code,npass,function(found){			
			console.log(found);
			res.json(found);
	});		
	});
	
	app.post('/senddata',function(req,res){
		
		var data = req.body.data;

		senddata.senddata(data,function (found) {
			console.log(found);
			res.json(found);
	    });
	});

	
	 // get all Temprature
    app.get('/api/temps', function (req, res) {
         // use mongoose to get all todos in the database
		 console.log('/api/temps');
        getTemps(res);
    });
    // create todo and send back all todos after creation
    app.post('/api/temps', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        Temp.create({
            date: req.body.date,
			tempval: req.body.tempval,
            done: false
        }, function (err, temp) {
            if (err)
                res.send(err);
            // get and return all the todos after you create another
           getTemps(res);
        });

    });
		 
    // delete a todo
    app.delete('/api/temps/:temp_id', function (req, res) {
        Temp.remove({
            _id: req.params.temp_id
        }, function (err, temp) {
            if (err)
                res.send(err);

            getTemps(res);
        });
    });
	
};



