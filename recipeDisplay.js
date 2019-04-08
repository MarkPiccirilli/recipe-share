module.exports = function() {
    var express = require('express');
    var router = express.Router();

    function getRecipeInfoById(req, res, mysql, context, complete) {
	var query ="SELECT r.name, r.instructions, r.meal_type, r.ethnic_cuisine, r.low_calorie, r.low_sodium, r.servings, u.id AS user_id, u.first_name, u.last_name, r.date_contributed FROM recipes r INNER JOIN users u ON u.id=r.contributor WHERE r.id=?"
	console.log(req.params);
	var inserts = [req.params.id];
	mysql.pool.query(query, inserts, function(error, results, fields) {
	    if(error) {
		    res.write(JSON.stringify(error));
		    rs.end();
	    }
	    context.recipe = results;
	    console.log(JSON.stringify(context));
	    console.log(context.recipe);
	    complete();
	});
    }
    /*
    function getRecipeIngredientsById(req, res, mysql, context, complete) {
	var query = "SELECT i.name AS ingredient_name, ri.ingredient_quantity FROM recipes r INNER JOIN recipe_ingredients ri ON ri.recipe_id = r.id INNER JOIN ingredients i ON i.id=ri.ingredient_id WHERE r.id = ?";
	console.log(req.params);
	var inserts = [req.params.id];
	mysql.pool.query(query, inserts, function(error, results, fields) {
	    if(error) {
		res.write(JSON.stringify(error));
		res.end();
	    }
	    context.ingredients = results;
	    console.log(JSON.stringify(context));
	    JSON.stringify(context);
	    complete();
	});
    }


    function getRecipeCookwareById(req, res, mysql, context, complete) {
	var query = "SELECT c.name AS cookware_name, c.cost FROM recipes r INNER JOIN recipe_cookware rc ON rc.recipe_id = r.id INNER JOIN cookware c ON c.id=rc.cookware_id WHERE r.id = ?";
	console.log(req.params);
	var inserts = [req.params.id];
	mysql.pool.query(query, inserts, function(error, results, fields) {
	    if(error) {
		res.write(JSON.stringify(error));
		res.end();
	    }
	    context.cookware = results;
	    console.log(JSON.stringify(context));
	    JSON.stringify(context);
	    complete();
	});
    }
    */

    router.get('/recipes/:id', function(req, res){
        var callBackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getRecipeInfoById(req, res, mysql, context, complete);
        //getRecipeIngredientsById(req, res, mysql, context, complete);
        //getRecipeCookwareById(req, res, mysql, context, complete);
        function complete() {
            callBackCount++;
            if(callBackCount > 0) {
                res.render('recipeDisplay', context.recipe[0]);
            }
        }
    });

    return router;
}();
