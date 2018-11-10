const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const api = require('./api')

const port = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded())

app.get('/', async (req, res) => {
  const content = await axios.get('https://como-fazer-9e94a.firebaseio.com/teste.json')
  res.render('index', { content: content.data })
})

app.get('/categorias/nova', (req, res) => {
  res.render('categorias/nova')
})

app.post('/categorias/nova', async (req, res) => {
  await axios.post('https://como-fazer-9e94a.firebaseio.com/categorias.json', req.body)
  res.redirect('/categorias')
})

app.get('/categorias', async (req, res) => {
  const categorias = await api.list('categorias')
  res.render('categorias/index', { categorias })
})

app.get('/categorias/excluir/:id', async (req, res) => {
  await api.apagar('categorias', req.params.id)
  res.redirect('/categorias')
})

app.get('/categorias/editar/:id', async (req, res) => {
  const content = await axios.get(`https://como-fazer-9e94a.firebaseio.com/categorias/${req.params.id}.json`)
  res.render('categorias/editar', {
     content: {
       id: req.params.id,
       ...content.data
     }
    }
  )
})

app.post('/categorias/editar/:id', async (req, res) => {
  await axios.put(`https://como-fazer-9e94a.firebaseio.com/categorias/${req.params.id}.json`, {
    categoria: req.body.categoria
  })
  res.redirect('/categorias')
})

app.listen(port, err => {
  if(err){
    console.log('erro')
  }else{
    console.log('Everything OK')
  }
})
