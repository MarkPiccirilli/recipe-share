module.exports = function() {
    var express = require('express');
	var router = express.Router();

	
	function checkAuthentication(req, res, next) {
		if(req.isAuthenticated()) {
			next();
		}
		else {
			res.redirect('/login.html');
		}
	}
	

    function getMyAccountInfoById(req, res, mysql, context, complete) {
	var query = "SELECT first_name, last_name, user_name, email, cooking_experience FROM users WHERE id=?";
	console.log(req.params);
	//console.log('uid: ' + req.user.id);
	var inserts = [req.user[0].id];
	console.log(JSON.stringify(req.user[0]));
	console.log("rui3: " + req.user[0].id);
	//var inserts = [req.session.passport.user.id];
	//console.log(req.session.passport.user.id);
	mysql.pool.query(query, inserts, function(error, results, fields) {
	    if(error) {
		res.write(JSON.stringify(error));
		res.end();
	    }
	    context.myAccountInfo = results;
	    console.log(JSON.stringify(context));
	    JSON.stringify(context);
	    complete();
	});
    }

    router.get('/my_account/', checkAuthentication, function(req, res) {
	var callBackCount = 0;
	var context = {};
	//console.log(JSON.stringify(req.user[0]));
	//console.log(Object.keys(req.user[0]));
	//var currentUser = Object.create(req.user[0]);
	//console.log("currusr" + currentUser);
	//console.log("cui: " + currentUser.first_name);
	console.log("rui: " + req.user[0].first_name);
	var mysql = req.app.get('mysql');
	getMyAccountInfoById(req, res, mysql, context, complete);
	function complete() {
		callBackCount++;
		console.log("rui2: " + JSON.stringify(req.user[0]));
		console.log("rui2: " + req.user[0].id);
	    if(callBackCount >= 1) {
			res.render('myAccount', context);
	    }
	}
    });

    return router;
}();
