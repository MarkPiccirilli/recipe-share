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
    
    function insertRecipeInfo(req, res, mysql, context, complete) {
        var sql = "INSERT INTO recipes (name, instructions, meal_type, ethnic_cuisine, servings, contributor, date_contributed) VALUES (?, ?, ?, ?, ?, ?, ?);";
        var date = new Date();
        var inserts = [req.body.name, req.body.instructions, req.body.meal_type, req.body.ethnic_cuisine, req.body.servings, req.user[0].id, date];
		sql = mysql.pool.query(sql, inserts, function(error, results) {
			if(error) {
				console.log(JSON.stringify(error));
				res.write(JSON.stringify(error));
				res.end();
			}
			else {
                context.id = results.insertId;
                console.log("rid1: " + results.insertId);
                console.log("cid1: " + context.id);
				complete();
			}
		});
    }
    
    function insertIngredientInfo(req, res, mysql, context, complete) {
        console.log("cid3: " + context.id);
        var sql = "INSERT INTO recipe_ingredients (recipe_id, ingredient_name, ingredient_quantity) VALUES (?, ?, ?)";
        var inserts = [context.id, context.ingredientName, 1];  //quantity temporarily hardcoded for testing
        mysql.pool.query(sql, inserts, function(error) {
            if(error) {
                console.log(JSON.stringify(error));
				res.write(JSON.stringify(error));
				res.end();
			}
			else {
                if(context.count <= req.body.ingredientNames.split(",").length) {  //bug here
                    context.count++;
                    console.log("count: " + context.count);
                    console.log("arraysize: " + req.body.ingredientNames.split(",").length);
                }
                else {
                    complete();
                }
			}
        });
    }

    router.post('/contributeRecipe', checkAuthentication, function(req, res) {
        var callBackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        insertRecipeInfo(req, res, mysql, context, complete);
        function complete() {
            callBackCount++;
            if(callBackCount == 1) {
                console.log("cid2: " + context.id);
                console.log("ingredient names: " + req.body.ingredientNames);
                console.log(typeof(req.body.ingredientNames));
                context.count = 0;
                req.body.ingredientNames.split(",").forEach(function(ingredient) {
                    context.ingredientName = ingredient;
                    insertIngredientInfo(req, res, mysql, context, complete);
                });
            }
            else if(callBackCount > 1) {
                console.log("complete");
                res.render("thankYou", req.user[0]);
            }
        }
    });

    return router;
}();



