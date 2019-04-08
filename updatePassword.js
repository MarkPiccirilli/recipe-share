module.exports = function() {
    var express = require('express');
    var router = express.Router();
    const bcrypt = require('bcrypt');
    const saltRounds = 10;

    router.post('/updatePassword', function(req, res) {
        var mysql = req.app.get('mysql');
        var sql = "UPDATE users SET user_password=? WHERE id=?;";
        bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
            var inserts = [hash, req.user[0].id];
            mysql.pool.query(sql, inserts, function(err, result, fields) {
                if(err) {
                    console.log(JSON.stringify(err));
                    res.end();
                }
                else {
                    console.log(result);
                    res.redirect('loadUpdateAccount');
                }
            });
        });
    });
    return router;
}();