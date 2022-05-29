const express = require('express');
const path = require('path');
const app = express();
const expressPort = 3030
const mainRouter = require('./routes/index');
const methodOverride = require('method-override');
const session = require ('express-session');
const cookieParser = require('cookie-parser')


// Argumento para usar put y delete //
app.use(methodOverride('_method'));

// Argumento para usar post
app.use(express.urlencoded({extended:false}));
app.use(express.json())

//middleware Session
app.use(session({
secret: 'Secreto!!',
resave: false,
saveUninitialized: false
}));
app.use(cookieParser())

  
// asignando la ruta para archivos publicos //
app.use(express.static(path.resolve(__dirname, './public')))


// levantando el servidor //
app.listen(process.env.PORT || expressPort, () => {
  console.log(`Servidor inciado en puerto ${expressPort}`)
  console.log(`Link al sitio: http://localhost:3030`)
})


// seteando el uso de plantillas ejs //
app.set('view engine', 'ejs');


// ROUTER PRINCIPAL //

app.use(mainRouter);





