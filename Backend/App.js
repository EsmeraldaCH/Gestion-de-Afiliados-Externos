// const express = require('express');
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const session = require('express-session');

// const app = express();

// app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(new GoogleStrategy({
//   clientID: '74459034187-u5ngulrnab97rvfdi4og2j1up4luhjet.apps.googleusercontent.com',
//   clientSecret: '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',
//   callbackURL: 'http://localhost:3000'
// }, (accessToken, refreshToken, profile, done) => {
//   return done(null, profile); // Pasar el perfil del usuario autenticado
// }));

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

// // Ruta para iniciar la autenticación con Google
// app.get('http://localhost:300', passport.authenticate('google', { scope: ['profile', 'email'] }));

// // Ruta de callback después de autenticarse
// app.get('http://localhost:300',
//   passport.authenticate('google', { failureRedirect: '/' }),
//   (req, res) => {
//     res.redirect('http://localhost:300'); // Redirige al frontend (perfil) después del login exitoso
//   }
// );

// // Ruta para obtener los datos del usuario autenticado
// app.get('/auth/user', (req, res) => {
//   if (req.isAuthenticated()) {
//     res.json(req.user);
//   } else {
//     res.status(401).json({ error: 'No autenticado' });
//   }
// });

// app.listen(3000, () => {
//   console.log('Servidor backend en ejecución en http://localhost:3000');
// });
