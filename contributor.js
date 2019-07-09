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

    function getAccountInfoById(req, res, mysql, context, complete) {
        var query = "SELECT u.user_name, u.first_name, u.last_name, u.cooking_experience FROM users u WHERE u.id=?";
        var inserts = [req.body.id];
        mysql.pool.query(query, inserts, function(error, results, fields) {
            if(error) {
            res.write(JSON.stringify(error));
            res.end();
            }
            context.userInfo = results;
            console.log(JSON.stringify(context));
            JSON.stringify(context);
            complete();
        });
    }

    function getRecipesContributedById(req, res, mysql, context, complete) {
        var query = "SELECT r.id AS recipeId, r.name FROM recipes r INNER JOIN users u ON u.id=r.contributor WHERE u.id=?";
        var inserts = [req.body.id];
        mysql.pool.query(query, inserts, function(error, results, fields) {
            if(error) {
            res.write(JSON.stringify(error));
            res.end();
            }
            context.recipesContributed = results;
            console.log(JSON.stringify(context));
            complete();
        });
    }

    router.post('/contributor', checkAuthentication, function(req, res) {
        console.log("pid: " + req.body.id);
        var callBackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getAccountInfoById(req, res, mysql, context, complete);
        getRecipesContributedById(req, res, mysql, context, complete);
        function complete() {
            callBackCount++;
            if(callBackCount >= 2) {
                res.render('contributor', context);
            }
        }
    });

    return router;
}();
