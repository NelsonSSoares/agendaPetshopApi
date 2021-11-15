const Atendimentos  = require('../models/atendimentos');

module.exports = app => {
    app.get('/atendimentos', (req, res) => res.send('você esta em rota de atendimento atendimento e esta realizando um GET'))
    
    app.post('/atendimentos', (req,res)=> {

        console.log(req.body)

        const atendimento = req.body
        Atendimentos.adiciona(atendimento)

        console.log(atendimento)
        res.send('Post de Atendimento')
    })
}