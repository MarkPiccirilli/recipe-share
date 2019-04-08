module.exports = function() {
    var express = require('express');
    var router = express.Router()

    router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('index.html');
    })

    return router;
}();