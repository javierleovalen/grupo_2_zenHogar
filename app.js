const express = require('express');
const path = require('path');
const app = express();
const expressPort = 3030
const mainRouter = require('./routes/index');
const apiRouter = require('./routes/api/index');
const methodOverride = require('method-override');
const session = require ('express-session');
const cookies = require('cookie-parser');
const loggedMiddleware = require('./middlewares/loggedMiddleware');



// Argumento para usar put y delete //
app.use(methodOverride('_method'));

// Argumento para usar post
app.use(express.urlencoded({extended:false}));
app.use(express.json())

//Session Middleware
app.use(session({
  secret: "shhh, it's a secret",
  resave: true,
  saveUninitialized: false
}));

// Cookie middleware
app.use(cookies())

app.use(loggedMiddleware);


// asignando la ruta para archivos publicos //
app.use(express.static(path.resolve(__dirname, './public')))




// seteando el uso de plantillas ejs //
app.set('view engine', 'ejs');


// ROUTER PRINCIPAL //

app.use(mainRouter);

// API ROUTER

app.use(apiRouter)

// levantando el servidor //
app.listen(process.env.PORT || expressPort, () => {
  console.log(`Servidor inciado en puerto ${expressPort}`)
  console.log(`Link al sitio: http://localhost:3030`)
})





