const express = require('express');
const passport = require('passport');
const session = require('express-session');
const path = require('path');
const multer = require('multer');
require('./auth'); // Asegúrate de tener este archivo configurado correctamente
const cors = require('cors');

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'cliente')));

// Middleware para verificar si el usuario está logueado
function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

// Configuración de sesiones
app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Asegúrate de usar 'true' si tu servidor está en HTTPS
}));

app.use(passport.initialize());
app.use(passport.session());

// Ruta para autenticarse con Google
app.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
);

// Ruta para manejar la respuesta de Google OAuth
app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/auth/google/failure'
    }),
    (req, res) => {
        // Redirigir a la página de perfil en el frontend
        res.redirect('http://localhost:3000/Profile');
    }
);

// Ruta protegida que muestra los datos del usuario
app.get('/auth/protected', isLoggedIn, (req, res) => {
    const user = {
        displayName: req.user.displayName,
        email: req.user.emails ? req.user.emails[0].value : 'No email available',
        photo: req.user.photos ? req.user.photos[0].value : 'No photo available',
        googleId: req.user.id,
    };

    res.json(user); // Enviar los datos como JSON
});

// Ruta para actualizar la foto de perfil
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Asegúrate de crear esta carpeta
    },
    filename: (req, file, cb) => {
        cb(null, `${req.user.googleId}-${Date.now()}${path.extname(file.originalname)}`); // Nombre único
    }
});

const upload = multer({ storage });

app.post('/auth/updateProfilePicture', isLoggedIn, upload.single('profilePicture'), (req, res) => {
    if (req.file) {
        const newPhotoUrl = `http://localhost:5000/uploads/${req.file.filename}`;
        // Aquí puedes guardar la nueva URL de la imagen en la base de datos o en el usuario
        // Por ejemplo, actualiza la foto en tu modelo de usuario aquí

        // Envía de vuelta los datos actualizados
        res.json({ ...req.user, photo: newPhotoUrl });
    } else {
        res.status(400).send('No se subió ninguna imagen');
    }
});

// Ruta en caso de fallo en la autenticación
app.get('/auth/google/failure', (req, res) => {
    res.send("Something went wrong");
});

// Iniciar el servidor
app.listen(5000, () => {
    console.log('Listening on port 5000');
});
