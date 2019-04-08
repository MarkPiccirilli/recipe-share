module.exports = function(passport, LocalStrategy, mysql) {
	const bcrypt = require('bcrypt');
	passport.use(new LocalStrategy(//{usernameField: 'user_name', passwordField: 'user_password'}, 
		function(username, password, done) {
			if(!username || !password) {
				console.log('username and password required');
				return done(null, false, {message: 'Username and Password required'});
			}
			//var mysql = req.app.get('mysql');
			sql = 'SELECT * FROM users WHERE user_name = ?';  

		    mysql.pool.query(sql, [username], function(err, user) {
				console.log(user);
		    if(err) {
				console.log('err');
			return done(err);
		    }
		    if(!user[0]) {
				console.log('username not found');
			return done(null,false, {message: 'Username not found'});
				}
				//console.log("up: " + user[0].user_password);
				//console.log('p: ' + password);
				//console.log(password.localeCompare(user[0].user_password));
		    bcrypt.compare(password, user[0].user_password, function(err, res) {
                if(res == false) {
                    console.log('incorrect password');
                    return done(null, false, {message: 'Incorrect Password'})
                }
                else {
                    console.log('correct!');
		            return done(null, user[0]);    
                }
            });
		});
	    }
	));

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		sql = 'SELECT * FROM users WHERE id = ?';
		mysql.pool.query(sql, [id], function(err, user) {
			done(err, user);
		});
	});
};
