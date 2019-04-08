module.exports= function() {
    var express = require('express');
    var router = express.Router();
    

    function checkAuthentication(req, res, next) {
        if(req.isAuthenticated()) {
                next();
        }
        else {
                res.redirect('/login.html');
        }
    }

    function getMyAccountInfoById(req, res, mysql, context, complete) {
        var query = "SELECT first_name, last_name, user_name, email, cooking_experience FROM users WHERE id=?";
        var inserts = [req.user[0].id];
        mysql.pool.query(query, inserts, function(error, results, fields) {
                if(error) {
                        res.write(JSON.stringify(error));
                        res.end();
                }
                context.myAccountInfo = results;
                console.log(JSON.stringify(context));
                complete();
        });
    }   



    router.get('/loadUpdateAccount', checkAuthentication, function(req, res) {
        var callBackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getMyAccountInfoById(req, res, mysql, context, complete);
        function complete() {
            callBackCount++;
            if(callBackCount > 0) {
                res.render('updateAccount', context.myAccountInfo[0]);
            }
        }

    });
    return router;
}();