const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const categorias = require('./routes/categorias')
const port = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded())
app.use('/categorias', categorias)

app.get('/', async (req, res) => {
  const content = await axios.get('https://como-fazer-9e94a.firebaseio.com/teste.json')
  res.render('index', { content: content.data })
})

app.listen(port, err => {
  if(err){
    console.log('erro')
  }else{
    console.log('Everything OK')
  }
})
