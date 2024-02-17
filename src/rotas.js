const express = require('express')
const validarRequisicao = require('./intermediadores/validarRequisicao')
const autenticacao = require('./intermediadores/autenticacao')
const rotas = express()

const schemaUsuario = require('./schemas/schemaUsuario')
const schemaLogin = require('./schemas/schemaLogin')

const cadastrarUsuario = require('./controladores/usuarios/cadastrarUsuario')
const login = require('./controladores/usuarios/login')
const detalharPerfilUsuario = require('./controladores/usuarios/detalharPerfilUsuario')
const atualizarUsuario = require('./controladores/usuarios/atualizarUsuario')
const listarCategorias = require('./controladores/categorias/listarCategorias')
const listarTransacoes = require('./controladores/transacoes/listarTransacoes')
const obterExtrado = require('./controladores/transacoes/obterExtrado')
const detalharTransacao = require('./controladores/transacoes/detalharTransacao')
const cadastrarTransacao = require('./controladores/transacoes/cadastrarTransacao')
const atualizarTransacao = require('./controladores/transacoes/atualizarTransacao')
const excluirTransacao = require('./controladores/transacoes/excluirTransacao')

rotas.post('/usuario', validarRequisicao(schemaUsuario), cadastrarUsuario)
rotas.post('/login', validarRequisicao(schemaLogin), login)

rotas.use(autenticacao)

rotas.get('/usuario', detalharPerfilUsuario)
rotas.put('/usuario', validarRequisicao(schemaUsuario), atualizarUsuario)

rotas.get('/categoria', listarCategorias)

rotas.get('/transacao', listarTransacoes)
rotas.get('/transacao/extrato', obterExtrado)
rotas.get('/transacao/:id', detalharTransacao)
rotas.post('/transacao', cadastrarTransacao)
rotas.put('/transacao/:id', atualizarTransacao)
rotas.delete('/transacao/:id', excluirTransacao)

module.exports = rotas