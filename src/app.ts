//Vai fornecer recursos para poder construir APis HTTP 
// Rotas, requisições e middlewares
import express from 'express';
import * as mysql from 'mysql2/promise'
import bcrypt from 'bcrypt'


//criando conexão com o banco de dados
function createConnection() {
    return mysql.createConnection({
        host: process.env.DB_HOST ?? 'localhost',
        port: Number(process.env.DB_PORT ?? 3306),
        user: process.env.DB_USER ?? 'root',
        password: process.env.DB_PASSWORD ?? 'root',
        database: process.env.DB_DATABASE ?? 'tickets'
    });
}


//iniciando express
const app = express()

//pega o json que chegou na requsição http, faz o parse  dele e coloca o resultado em req.body como um objeto javascript
app.use(express.json())

app.get('/', (req, res) => {
    res.json({ message: "teste de rota" })
})

//autenticação do usuario preciso ainda criar  
//POST = criação 
app.post('/auth/login', (req, res) => {
    //pegando os dados no corpo da requisição
    const { email, password } = req.body;
    console.log(email, password)
    //sende sendo usando para enviar de volta uma resposta para o cliente, nesse caso estou enviando um json
    res.send("Login efeturado com sucesso! ")
})

//criando conexoes com o banco de dados e inserindo dados na tabela users e partners
app.post('/partners', async (req, res) => {
    const connection = await createConnection();

    try {
        const { name, email, password, company_name } = req.body
        const creadtedAT = new Date()

        //dados que irei criptografar
        const hashedPassword = await bcrypt.hash(password, 10)

        //Usuario
        const [userResult] = await connection.execute<mysql.ResultSetHeader>('INSERT INTO users (name, email, password, created_at) VALUES (?, ?, ?, ?)', [name, email, hashedPassword, creadtedAT])
        const userId = userResult.insertId

        //Parceiro
        const [partnerResult] = await connection.execute<mysql.ResultSetHeader>('INSERT INTO partners (users_id, company_name, created_at) VALUES (?, ?, ?)',
            [userId, company_name, creadtedAT])

        //representando a resposta que será enviada para o cliente, nesse caso estou enviando um json
        res.status(201)
            .json({ message: 'Parceiro criado com sucesso', partnerId: partnerResult.insertId, company_name, created_at: creadtedAT })
    } catch (error) {
        console.error('Erro ao criar parceiro:', error)
        res.status(500).json({ message: 'Erro ao criar parceiro' })
    } finally {
        await connection.end()
    }
})



//rotas 
//Criando Consumidor-clientes
app.post('/customers', (req, res) => {
    res.status(501).json({ message: 'Cadastro de clientes ainda não implementado' })
})

//Criando evento
app.post('/partners/events', (req, res) => {
    res.status(501).json({ message: 'Cadastro de eventos ainda não implementado' })
})

//Buscando evento por ID
app.get('/events/:eventId', (req, res) => {
    const { eventId } = req.params
    console.log(eventId)
    res.send();
})

// listagem de eventos - buscando eventos de um parceiro especifico
app.get('/partners/events', (req, res) => {
    res.json([])
})

//Buscando evento por ID
app.get('/partners/events/:eventId', (req, res) => {
    const { eventId } = req.params
    console.log(eventId)
    res.send();
})

app.get('/events', (req, res) => {
    res.json([])
})

app.listen(3000, async () => {
    //ISSO LIMPA AS TABELAS DO BANCO DE DADOS, PARA QUE EU POSSA TESTAR SEM PRECISAR FICAR CRIANDO USUARIOS E PARCEIROS NOVAMENTE
    const connection = await createConnection();
    await connection.execute("TRUNCATE TABLE users")
    await connection.execute("TRUNCATE TABLE partners")
    await connection.execute("TRUNCATE TABLE events")
    await connection.execute("TRUNCATE TABLE customers")
    console.log('rodando na porta http://localhost:3000')
})

