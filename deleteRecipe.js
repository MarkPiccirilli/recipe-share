module.exports = function() {
    var express = require("express");
    var router = express.Router();

    router.post("/deleteRecipe", function(req, res) {
        var mysql = req.app.get("mysql");
        var sql = "DELETE FROM recipes WHERE id=?";
        var inserts = [req.body.recipeId];
        mysql.pool.query(sql, inserts, function(error) {
            if(error) {
                res.write(error);
                res.end();
            }
            else {
                res.redirect("/my_account");
            }
        });
    });

    return router;
}();