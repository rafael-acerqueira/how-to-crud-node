const express = require('express')
const router = express.Router()
const api = require('../api')

router.get('/nova', (req, res) => {
  res.render('categorias/nova')
})

router.post('/nova', async (req, res) => {
  await api.create('categorias', {
    categoria: req.body.categoria
  })
  res.redirect('/categorias')
})

router.get('', async (req, res) => {
  const categorias = await api.list('categorias')
  res.render('categorias/index', { categorias })
})

router.get('/excluir/:id', async (req, res) => {
  await api.apagar('categorias', req.params.id)
  res.redirect('/categorias')
})

router.get('/editar/:id', async (req, res) => {
    const content = await api.get('categorias', req.params.id )
    res.render('categorias/editar', {
      content
    })
})

router.post('/editar/:id', async (req, res) => {
  await api.update('categorias', req.params.id, {
    categoria: req.body.categoria
  })
  res.redirect('/categorias')
})

module.exports = router
