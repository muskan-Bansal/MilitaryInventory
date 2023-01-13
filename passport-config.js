const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    const user = getUserByEmail(email);
    console.log('all', user);
    if (user == null) {
      console.log('no such email');
      return done(null, false, { message: 'No user with that email' });
    }

    try {
      if (password == user.password) {
        console.log('password-matched');
        return done(null, user);
      } else {
        console.log(`Username =${user}`);
        console.log(`password =${password}`);
        console.log(`user.password =${user.password}`);

        return done(null, false, { message: 'Password incorrect' });
      }
    } catch (e) {
      return done(e);
    }
  };

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id));
  });
}

module.exports = initialize;
