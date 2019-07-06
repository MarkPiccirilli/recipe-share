module.exports=function() {
    var express = require('express');
    var router = express.Router();

    router.post('/submitRecipeComment', function(req, res) {
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO recipe_comments (recipe_id, comment_writer_id, comment_writer, recipe_comment, update_comment) VALUES (?, ?, ?, ?, ?)";
        console.log("subrid: " + req.body.recipe_id);
        var inserts = [req.body.recipe_id, req.user[0].id, req.user[0].user_name, req.body.comment, 0];
        sql=mysql.pool.query(sql, inserts, function(error, result, fields) {
            if(error) {
                console.log(JSON.stringify(error));
                res.write(JSON.stringify(error));
                res.end();
            }
            else {
                res.redirect('/recipes/' + inserts[0]);
            }
        });
    });
    return router;
}();