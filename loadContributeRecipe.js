module.exports = function() {
    var express = require('express');
    var router = express.Router();

    //checkAuthentication = require('./checkAuthentication')(req, res, next);
    
    function checkAuthentication(req, res, next) {
        if(req.isAuthenticated()) {
                next();
        }
        else {
                res.redirect('/login.html');
        }
    }

    router.get('/loadContributeRecipe', checkAuthentication, function(req, res) {
        res.redirect('contribute_recipe.html');
    });

    return router;
}();