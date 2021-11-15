class Tables{
    init(conexao){
        this.conexao = conexao;
        this.criarAtendimentos()
    }
    criarAtendimentos(){
        const sql = `CREATE TABLE IF NOT EXISTS atendimentos (id int NOT NULL AUTO_INCREMENT,
                     cliente varchar(50) NOT NULL,
                     pet varchar(20),
                     servico varchar(20) NOT NULL,
                     status varchar(20) NOT NULL,
                     observacao text,
                     PRIMARY KEY (id))`

        this.conexao.query(sql, (error)=>{
            if(error){
                console.log(error)
            }else{
                console.log('table created successfully')
            }
        })
    }
}

module.exports = new Tables;