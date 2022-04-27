const express = require('express')
const path = require('path')

const app = express()
const expressPort = 3030
  
app.use(express.static(path.resolve(__dirname, './public')))

app.listen(process.env.PORT || expressPort, () => {
  console.log(`Servidor iniciado`)
})


app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './views/new_home.html'))
})

app.get('/contacto', (req, res) => {
  res.sendFile(path.resolve(__dirname, './views/about.html'))
})

app.get('/new_cart', (req, res) => {
  res.sendFile(path.resolve(__dirname, './views/new_cart.html'))
})

app.get('/login', (req, res) => {
  res.sendFile(path.resolve(__dirname, './views/new_login.html'))
})

app.get('/product-detail', (req, res) => {
  res.sendFile(path.resolve(__dirname, './views/new_product-detail.html'))
})

app.get('/register', (req, res) => {
  res.sendFile(path.resolve(__dirname, './views/new_register.html'))
})