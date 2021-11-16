
const Atendimentos  = require('../models/atendimentos');

module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        Atendimentos.lista(res)
    })
    
    app.get('/atendimentos/:id', (req,res)=>{
        const id = parseInt(req.params.id)

        Atendimentos.buscaId(id,res)
        res.send('OK')
    })

    app.post('/atendimentos', (req,res)=> {

        console.log(req.body)

        const atendimento = req.body
        Atendimentos.adiciona(atendimento, res)

        console.log(atendimento)
        res.send('Post de Atendimento')
    })

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        Atendimentos.alterar(id, valores, res)
    })

    app.delete('/atendimentos/:id', (req,res)=>{
        const id = parseInt(req.params.id)

        Atendimentos.deletar(id,res)
    })
}