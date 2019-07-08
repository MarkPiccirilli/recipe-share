module.exports=function() {
    var express = require("express");
    var router = express.Router();

    function checkAuthentication(req, res, next) {
		if(req.isAuthenticated()) {
			next();
		}
		else {
			res.redirect('/login.html');
		}
	}

    router.post("/deleteRecipeComment", checkAuthentication, function(req, res) {
        var mysql = req.app.get("mysql");
        var sql = "DELETE FROM recipe_comments WHERE id=?";
        var inserts = [req.body.commentId];
        mysql.pool.query(sql, inserts, function(error) {
            if(error) {
                console.log(JSON.stringify(error));
                res.end();
            }
            else {
                res.redirect("/recipes/" + req.body.recipeId);
            }
        });
    });
    return router;
}();