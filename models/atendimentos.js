const conexao = require('../infra/connections')

class Atendimentos{
    adiciona(atendimento){
        const sql = `INSERT INTO atendimentos SET ?`

        conexao.query(sql, atendimento, (error, resultados) => {
            if(error){
                console.log(error)
            }else{
                console.log(resultados)
            }
        })

    }
}

module.exports = new Atendimentos;