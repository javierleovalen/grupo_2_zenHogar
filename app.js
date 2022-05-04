const express = require('express')
const path = require('path')
const app = express()
const expressPort = 3030
const mainRouter = require('./routes/index')

  
// asignando la ruta para archivos publicos //
app.use(express.static(path.resolve(__dirname, './public')))



// levantando el servidor //
app.listen(process.env.PORT || expressPort, () => {
  console.log(`Servidor inciado en puerto ${expressPort}`)
})



// seteando el uso de plantillas ejs //
app.set('view engine', 'ejs');



app.use('/', mainRouter);

app.use('/contacto', mainRouter);

app.use('/cart', mainRouter);

app.use('/login', mainRouter);

app.use('/product-detail', mainRouter);

app.use('/register', mainRouter);




// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './views/new_home.html'))
// })

// app.get('/contacto', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './views/about.html'))
// })

// app.get('/cart', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './views/new_cart.html'))
// })

// app.get('/login', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './views/new_login.html'))
// })

// app.get('/product-detail', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './views/new_product-detail.html'))
// })

// app.get('/register', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './views/new_register.html'))
// })

