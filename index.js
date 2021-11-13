const customExpress = require('./config/customExpress')
const conexao = require('./infra/connections')
const tables = require('./infra/tables')
conexao.connect((error) => {
    if(error){
        console.log(error)
    }else{
        console.log('Database connected successfully')
        tables.init(conexao)
        const app = customExpress()

        app.listen(3000, ()=> console.log('Servidor Iniciado com Sucesso!'));

    }
})

