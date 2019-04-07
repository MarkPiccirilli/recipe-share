module.exports= function() {
    var express = require('express');
    var router = express.Router();

    router.post('/createAccount',function(req, res) {
	var mysql = req.app.get('mysql');
	var sql = "INSERT INTO users (first_name, last_name, user_name, user_password, email, cooking_experience) VALUES (?, ?, ?, ?, ?, ?)";
	var inserts = [req.body.first_name, req.body.last_name, req.body.user_name, req.body.password, req.body.email, req.body.cooking_experience];
	sql=mysql.pool.query(sql, inserts, function(error, result, fields) {
	    if(error) {
		console.log(JSON.stringify(error))
		res.write(JSON.stringify(error));
		res.end();
	    }
	    else {
		res.redirect('/my_account/' + result.insertId);
		console.log(result.insertId);
		console.log(result);
		}
	});
    });
    return router;
}();
