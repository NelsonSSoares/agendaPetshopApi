const moment = require('moment')
const conexao = require('../infra/connections')

class Atendimentos{
    adiciona(atendimento, res){

        
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
       
        const dataValida = moment(data).isSameOrAfter(dataCriacao) // validação de data, atual ou posterior
        const clienteValido = atendimento.cliente.length >= 5

        const validacoes = [
            {nome: 'data',
            valido: dataValida,
            mensagem: 'Data deve ser maior ou igual a data atual'
        },
        {
            nome: 'cliente',
            valido: clienteValido,
            mensagem: 'O nome deve possuir mais de 5 caracteres'
        }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existeErrors = erros.length

        if(existeErrors){
            res.status(400).json(erros)
        }else{
            const atendimentoDatado = {...atendimento, data, dataCriacao}
            const sql = `INSERT INTO atendimentos SET ?`

            conexao.query(sql, atendimentoDatado, (error, resultados) => {
                if(error){
                    //res.status(400).json(error)
                    console.log(error)
                }else{
                    //res.status(201).json(resultados)
                    console.log(resultados)
                }
            })
        }  

    }
}

module.exports = new Atendimentos;