const express = require('express')
const app = express()

const port = process.env.PORT || 3000

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, err => {
  if(err){
    console.log('erro')
  }else{
    console.log('Everything OK')
  }
})
