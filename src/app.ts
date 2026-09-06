//Vai fornecer recursos para poder construir APis HTTP 
// Rotas, requisições e middlewares
import express from 'express';

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
    //
    //sende sendo usando para enviar de volta uma resposta para o cliente, nesse caso estou enviando um json
    res.send()
})

//criando parceiro
app.post('/partners', (req, res) => {
    const { name, email, password, company_name } = req.body
})

//Criando Consumidor-clientes
app.post('/customers', (req, res) => {
    const { name, email, password, address, telefone } = req.body
})

//Criando evento
app.post('/partners/events', (req, res) => {
    const { name, description, date, location } = req.body
})

// Buscando dados dos eventos 
app.get('/partners/events', (req, res) => {

})

//Buscando evento por ID
app.get('/events/:eventId', (req, res) => {
    const {eventId} = req.params
    console.log(eventId)
    res.send();
})

// listagem de eventos - buscando eventos de um parceiro especifico
app.get('/partners/events', (req, res) => {
    const {name , description, date} = req.body
})

//Buscando evento por ID
app.get('/partners/events/:eventId', (req, res) => {
    const {eventId} = req.params
    console.log(eventId)
    res.send();
})

app.listen(3000, () => {
    console.log('rodando na porta http://localhost:3000')
})

