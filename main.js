
var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');


var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.use(bodyParser.urlencoded({extended:false}));


var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

app.engine('handlebars', handlebars.engine);
require('./login.js')(passport, LocalStrategy, mysql);
app.use(session({ secret:'Leo' , resave: true, saveUninitialized: true}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', 3000);
app.set('mysql', mysql);
app.use('/', require('./index.js'));
app.use('/', require('./createAccount.js'));
app.use('/', require('./myAccount.js'));
app.use('/', require('./deleteRecipe.js'));
app.use('/', require('./updateAccount.js'));
app.use('/', require('./loadUpdateAccount.js'));
app.use('/', require('./updatePassword.js'));
app.use('/', require('./logout.js'));
app.use('/', require('./loadContributeRecipe.js'));
app.use('/', require('./contribute_recipe.js'));
app.use('/', require('./recipeDisplay.js'));
app.use('/', require('./contributor.js'));
app.use('/', require('./searchResults.js'));
app.use('/', require('./submitRecipeComment.js'));
app.use('/', require('./deleteRecipeComment.js'));
app.use('/', require('./updateRecipeComment.js'));
app.use('/', require('./loadUpdateRecipeComment.js'));
app.post('/login', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login.html', failureFlash: true}));
app.use('/', express.static('public'));

app.use(function(req,res) {
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

apikey = "2e6e42714a49946a628cd94d888b9fcf";
apiid = "f4784748";

var http = require("http");
var url = require("url");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

http.createServer(function(req, res) {
    var q = url.parse(req.url, true).query;
    console.log("q.newIngredient: " + q.newIngredient);
    var apireq = new XMLHttpRequest();
    apireq.open('GET', 'https://api.nutritionix.com/v1_1/search/' + q.newIngredient + '?results=0:1&fields=item_name,nf_serving_size_qty,nf_serving_size_unit,nf_calories,nf_total_fat,nf_colesterol,nf_sodium,nf_total_carbohydrate,nf_sugars,nf_protein&appId=' + apiid + '&appKey=' + apikey, true);
    apireq.addEventListener("load", function() {
        if(apireq.status >= 200 && apireq.status <= 400) {
            console.log("respond test");
            res.writeHead(200, {"Content-Type": "application/json"});
            res.write(apireq.responseText);
            console.log("type: " + typeof(apireq.responseText));
            console.log(JSON.parse(apireq.responseText));
            res.end(apireq.responseText);
            console.log("respond test 2");
        }
        else {
            console.log("Error in network request: " + req.statusText);
        }
    });
    apireq.send(null);
    //event.preventDefault();
}).listen(3001);


app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
