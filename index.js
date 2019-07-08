module.exports = function() {
    var express = require("express");
    var router = express.Router()

    router.get("/", function(req, res) {
        var authenticated;
        if(req.isAuthenticated()) {
            console.log("true"); //testing code
            authenticated = true;
        }
        else {
            console.log("false"); //testing code
            authenticated = false;
        }
        res.render("index", {authenticated});
    });
    return router;
}();