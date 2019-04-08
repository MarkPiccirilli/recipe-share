module.exports= function() {
    var express = require('express');
		var router = express.Router();
		const bcrypt = require('bcrypt');
		const saltRounds = 10;

    router.post('/createAccount',function(req, res) {
		var mysql = req.app.get('mysql');
		var sql = "INSERT INTO users (first_name, last_name, user_name, user_password, email, cooking_experience) VALUES (?, ?, ?, ?, ?, ?)";
		bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
			var inserts = [req.body.first_name, req.body.last_name, req.body.user_name, hash, req.body.email, req.body.cooking_experience];
			sql=mysql.pool.query(sql, inserts, function(error, result, fields) {
				if(error) {
					console.log(JSON.stringify(error))
					res.write(JSON.stringify(error));
					res.end();
				}
				else {
					res.redirect('/my_account/');
					console.log(result.insertId);
					console.log(result);
				}
			});
		});
    });
    return router;
}();
