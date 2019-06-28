
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
app.use('/', require('./createAccount.js'));
app.use('/', require('./myAccount.js'));
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
app.post('/login', passport.authenticate('local', {successRedirect: '/index.html', failureRedirect: '/login.html', failureFlash: true}));
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


app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
