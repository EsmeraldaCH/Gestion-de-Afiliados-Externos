const express = require('express');
const passport = require('passport');
const session = require('express-session');
const { use } = require('passport');
const path = require('path');
const app = express();
require ('./auth');
app.use (express.json());
app.use (express.static( path.json(_dirname, 'cliente')));


function isLoggedIn(req, res, next){
    req.user ? next(): res.sendStatus(401);
}

app.get ('/', (req, res)=>{
    res.sendFile(index.html)
});

app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }));

  app.use(passport.initialize());
  app.use(passport.session());

app.get('/auth/google',
    passport.authenticate('google', { scope:
        [ 'email', 'profile' ] }
  ));
  
  app.get( '/auth/google/callback',
      passport.authenticate( 'google', {
          successRedirect: '/auth/protected',
          failureRedirect: '/auth/google/failure'
  }));

  app.get('/auth/protected', isLoggedIn,(req, res)=>{
    let name = req.user.displayName;
    res.send("Hello ${name}");
  });

  app.get('/auth/google/failure',(req, res)=>{
    res.send("Something went wrong");
  });

 app.listen ( 3000, ( )=>{
    console.log(' Listening on port 3000')
});
