const express = require('express')
const path = require('path')

const app = express()
const expressPort = 3030

app.use(express.static(path.resolve(__dirname, './public')))

app.listen(expressPort, () => {
  console.log(`Servidor escuchando en el puerto ${expressPort}`)
})

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './views/home.html'))
})

app.get('/contacto', (req, res) => {
  res.sendFile(path.resolve(__dirname, './views/about.html'))
})

app.get('/cart', (req, res) => {
  res.sendFile(path.resolve(__dirname, './views/cart.html'))
})

app.get('/login', (req, res) => {
  res.sendFile(path.resolve(__dirname, './views/login.html'))
})

app.get('/product-detail', (req, res) => {
  res.sendFile(path.resolve(__dirname, './views/product-detail.html'))
})

app.get('/register', (req, res) => {
  res.sendFile(path.resolve(__dirname, './views/register.html'))
})