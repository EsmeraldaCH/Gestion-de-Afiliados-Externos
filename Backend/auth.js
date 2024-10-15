const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
require('dotenv').config();  // Cargar variables de entorno desde .env

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback",
    passReqToCallback: true
},
// Manejo de autenticación con Google OAuth
function(request, accessToken, refreshToken, profile, done) {
    console.log('Google Profile:', profile);  // Verifica los datos del perfil en la consola
    done(null, profile);  // Pasar el perfil del usuario a la sesión
}
));

// Serializar usuario en la sesión
passport.serializeUser((user, done) => {
    done(null, user);
});

// Deserializar usuario desde la sesión
passport.deserializeUser((user, done) => {
    done(null, user);
});

