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
		var inserts = [req.user[0].id];
		mysql.pool.query(query, inserts, function(error, results, fields) {
			if(error) {
				res.write(JSON.stringify(error));
				res.end();
			}
			context.myAccountInfo = results;
			complete();
		});
    }

    function getRecipesByContributorId(req,res, mysql, context, complete) {
        var query = "SELECT id, name FROM recipes WHERE contributor = ?;";
        var inserts = [req.user[0].id];
        mysql.pool.query(query, inserts, function(err, results, fields) {
            if(err) {
                res.write(JSON.stringify(err));
                res.end();
            }
            context.recipes = results;
            console.log(results);
            complete();
        });
    }

    router.get('/my_account/', checkAuthentication, function(req, res) {
		var callBackCount = 0;
		var context = {};
		var mysql = req.app.get('mysql');
        getMyAccountInfoById(req, res, mysql, context, complete);
        getRecipesByContributorId(req, res, mysql, context, complete);
		function complete() {
			callBackCount++;
			if(callBackCount > 1) {
                console.log(context.recipes[2].name);
				res.render('myAccount', {accountInfo: context.myAccountInfo[0], recipes: context.recipes});
			}
		}
    });

    return router;
}();
