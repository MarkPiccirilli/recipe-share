module.exports= function() {
    var express = require('express');
    var router = express.Router();
    const bcrypt = require('bcrypt');
    const saltRounds = 10;

    router.post('/updateAccount', function(req,res) {
        var mysql = req.app.get('mysql');
        var sql = "UPDATE users SET first_name=?, last_name=?, user_name=?, email=?, cooking_experience=? WHERE id=?;";
        var inserts =[req.body.first_name, req.body.last_name, req.body.user_name, req.body.email, req.body.cooking_experience, req.user[0].id];
        sql=mysql.pool.query(sql, inserts, function(err, result, fields) {
            if(err) {
                console.log(JSON.stringify(err));
                res.end();
            }
            else {
                console.log(result);
                res.redirect('my_account');
            }
        });
    });
    return router;
}();