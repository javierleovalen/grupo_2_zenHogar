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


// ROUTER PRINCIPAL //

app.use(mainRouter);



