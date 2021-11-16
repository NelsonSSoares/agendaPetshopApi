const moment = require('moment')
const atendimentos = require('../controllers/atendimentos')
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
                    //res.status(201).json(atendimentos)
                    //res.sendStatus
                    console.log(resultados)
                }
            })
        }  

    }

    lista(res){
        const sql = 'SELECT * FROM atendimentos'

        conexao.query(sql, (error, resultados) =>{
            if(error){
                res.status(400).json(error)
            }else{
                res.status(200).json(resultados)
            }
        })
    }

    buscaId(id,res){
        const sql = `SELECT * FROM atendimentos WHERE id = ${id}`

        

        conexao.query(sql, (error, resultados) => {
            const atendimento = resultados[0]
            if(error){
                console.log(error)
            }else{
                console.log(atendimento)
            }
        })
    }
    alterar(id, valores, res){

        if(valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }

        const sql = 'UPDATE atendimentos SET ? WHERE id= ?'

        conexao.query(sql, [valores,id],(error, resultados)=>{
            if(error){
                //res.sendStatus(400).json(error)
                console.log(error)
            }else{
                //res.sendStatus(200).json({...valores, id})
                console.log(resultado)
            }
        })
    }

    deletar(id, res){
        const sql = 'DELETE FROM atendimentos WHERE id = ?'

        conexao.query(sql, id, (error, resultado)=>{
            if(error){
                console.log(error)
            }else{
                console.log(resultado)
                //res.status(200).json({id})
            }
        })
    }
}

module.exports = new Atendimentos;