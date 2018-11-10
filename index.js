const express = require('express')
const app = express()
const axios = require('axios')
const bodyParser = require('body-parser')
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
  const content = await axios.get('https://como-fazer-9e94a.firebaseio.com/categorias.json')
  if(content.data){
    const categorias = Object
                          .keys(content.data)
                          .map( key => {
                            return {
                              id: key,
                              ...content.data[key]
                            }
                          })
    res.render('categorias/index', { categorias })
  }else{
    res.render('categorias/index', { categorias: [] })
  }

})

app.get('/categorias/excluir/:id', async (req, res) => {
  await axios.delete(`https://como-fazer-9e94a.firebaseio.com/categorias/${req.params.id}.json`)
  res.redirect('/categorias')
})

app.listen(port, err => {
  if(err){
    console.log('erro')
  }else{
    console.log('Everything OK')
  }
})
