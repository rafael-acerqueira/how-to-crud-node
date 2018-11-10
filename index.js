const express = require('express')
const app = express()
const axios = require('axios')

const port = process.env.PORT || 3000

app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
  const content = await axios.get('https://como-fazer-9e94a.firebaseio.com/teste.json')
  res.render('index', { content: content.data })
})

app.get('/categorias/nova', (req, res) => {
  res.render('categorias/nova')
})

app.post('/categorias/nova', (req, res) => {
  console.log(res)
})

app.listen(port, err => {
  if(err){
    console.log('erro')
  }else{
    console.log('Everything OK')
  }
})
