module.exports = function() {
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

    router.post("/loadUpdateRecipeComment", checkAuthentication, function(req, res) {
        var mysql = req.app.get("mysql");
        var sql = "UPDATE recipe_comments SET update_comment = 1 WHERE id = ?";
        var inserts = [req.body.commentId];
        mysql.pool.query(sql, inserts, function(error) {
            if(error) {
                res.write(error);
                res.end();
            }
            else {
                res.redirect("/recipes/" + req.body.recipeId);
            }
        });
    });
    return router;
}();