module.exports= function(){
    var express = require('express');
    var router = express.Router();

    function getRecipesByName(req, res, mysql, context, complete) {
        var query;
        var inserts;
        console.log("keyword: " + req.body.keyword);
        console.log("meal_type: " + req.body.meal_type);
        console.log("ethnic_cuisine: " + req.body.ethnic_cuisine);
        if(req.body.meal_type == "" && req.body.ethnic_cuisine == "" && req.body.keyword == "") {

        }
        else if(req.body.meal_type == "" && req.body.ethnic_cuisine == "") {
            query = "SELECT id, name FROM recipes WHERE name=?;";
            inserts = [req.body.keyword];
            console.log("nametest");
        }
        else if(req.body.meal_type == "" && req.body.keyword == "") {
            query = "SELECT id, name FROM recipes WHERE ethnic_cuisine=?;";
            inserts = [req.body.ethnic_cuisine];
        }
        else if(req.body.ethnic_cuisine == "" && req.body.keyword == "") {
            query = "SELECT id, name FROM recipes WHERE meal_type=?;";
            inserts = [req.body.meal_type];
        }
        else if(req.body.keyword == "") {
            query = "SELECT id, name FROM recipes WHERE meal_type=? AND ethnic_cuisine=?;";
            inserts = [req.body.meal_type, req.body.ethnic_cuisine];
        }
        else if(req.body.ethnic_cuisine == "") {
            console.log("namemealtest");
            query = "SELECT id, name FROM recipes WHERE name=? and meal_type=?";
            inserts = [req.body.keyword, req.body.meal_type];
        }
        else {
            console.log("namemealethnictest");
            query = "SELECT id, name FROM recipes WHERE name=? AND meal_type=? AND ethnic_cuisine=?;";
            inserts = [req.body.keyword, req.body.meal_type, req.body.ethnic_cuisine];
        }
        mysql.pool.query(query, inserts, function(error, results, fields) {
            if(error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.recipes = results;
            complete();
        });
    }

    router.post('/keywordSearch', function(req, res){
        var callBackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getRecipesByName(req, res, mysql, context, complete);
        function complete() {
            callBackCount++;
            if(callBackCount > 0) {
                console.log(context.recipes);
                res.render('searchResults', {recipes: context.recipes});
            }
        }
    });

    return router;
}();
