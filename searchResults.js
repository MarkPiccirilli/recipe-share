module.exports= function(){
    var express = require('express');
    var router = express.Router();

    function getRecipesByName(req, res, mysql, context, complete) {
        var query = "SELECT id, name FROM recipes where name=?";
        console.log("input: " + req.body.keyword);
        var inserts = [req.body.keyword];
        mysql.pool.query(query, inserts, function(error, results, fields) {
            if(error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.recipes = results;
	        console.log("function: " + JSON.stringify(context));
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


    //router.get('/filter_search/
    return router;
}();
