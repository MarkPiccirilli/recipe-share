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
                res.end();
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
    function getRecipeCommentsById(req, res, mysql, context, complete) {
        var query = "SELECT c.id AS comment_id, c.comment_writer_id, c.comment_writer, c.recipe_comment, c.update_comment, r.contributor FROM recipe_comments c INNER JOIN recipes r ON c.recipe_id = r.id WHERE c.recipe_id=?";
        var inserts = [req.params.id];
        mysql.pool.query(query, inserts, function(error, results, fields) {
            if(error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.comments = results;
            console.log(results);
            console.log(context.comments);
            for(i = 0; i < context.comments.length; i++) {
                //set userBool to true is user is comment writer
                if(req.isAuthenticated() && req.user[0].id == context.comments[i].comment_writer_id) {
                    context.comments[i].userBool = true;
                }
                else {
                    context.comments[i].userBool = false;
                }
                //set ownerBool to true if user contributed this recipe
                console.log("contributor: " + context.comments[i].contributor);
                if(req.isAuthenticated() && req.user[0].id == context.comments[i].contributor) {
                    context.comments[i].ownerBool=true;
                }
                else {
                    context.comments[i].ownerBool = false;
                }
                context.comments[i].recipeId = req.params.id;
            }  
            complete();
        });    
    }

    router.get('/recipes/:id', function(req, res){
        var callBackCount = 0;
        var context = {};
        context.rid = req.params.id;
        var mysql = req.app.get('mysql');
        getRecipeInfoById(req, res, mysql, context, complete);
        //getRecipeIngredientsById(req, res, mysql, context, complete);
        //getRecipeCookwareById(req, res, mysql, context, complete);
        getRecipeCommentsById(req, res, mysql, context, complete);
        function complete() {
            callBackCount++;
            if(callBackCount > 1) {
                res.render('recipeDisplay', context);
            }
        }  
    });
    return router;
}();
