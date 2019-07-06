module.exports=function() {
    console.log("test1");
    var express = require("express");
    var router = express.Router();

    router.post("/deleteRecipeComment", function(req, res) {
        console.log("test2");
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