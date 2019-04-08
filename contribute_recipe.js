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

    router.post('/contributeRecipe', checkAuthentication, function(req, res) {
		console.log(req.body);
		var mysql = req.app.get('mysql');
		var sql = "INSERT INTO recipes (name, instructions, meal_type, ethnic_cuisine, servings, contributor, date_contributed) VALUES (?, ?, ?, ?, ?, ?, ?)";
		var date = new Date();
		var inserts = [req.body.name, req.body.instructions, req.body.meal_type, req.body.ethnic_cuisine, req.body.servings, req.user[0].id, date];
		sql = mysql.pool.query(sql,inserts,function(error, result, fields) {
			if(error) {
				console.log(JSON.stringify(error));
				res.write(JSON.stringify(error));
				res.end();
			}
			else {
				res.render('thankYou', req.user[0]);
			}
		});
    });

    return router;
}();



