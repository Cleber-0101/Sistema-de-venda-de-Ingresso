//Vai fornecer recursos para poder construir APis HTTP 
// Rotas, requisições e middlewares
import express from 'express';

//iniciando 
const app = express()


//Criando end points
//Configuração para receber um json e tranforma em Objeto 
//para eu pode manipular esses dados
app.use(express.json())

app.get('/', (req, res) => {
    res.json({ message: "teste de rota" })
})

//autenticação do usuario
//POST = criação 
app.post('/auth/login', (req, res) => {
    //pegando os dados no corpo da requisição
    const { email, password } = req.body;
    console.log(email, password)
    res.send()
})

//Parceiros 
app.post('/partners', (req, res) => {
    const { name, email, password, company_name } = req.body
})


//Consumidor-clientes
app.post('/customers', (req, res) => {
    const { name, email, password, address, telefone } = req.body
})

//Criando evento
app.post('/partners/events', (req, res) => {
    const { name, description, date, location } = req.body
})

// buscando dados dos eventos 
app.get('/partners/events', (req, res) => {

})



//Buscando evento por ID
app.get('/events/:eventId', (req, res) => {
    const {eventId} = req.params
    console.log(eventId)
    res.send();
})



// listagem de eventos 
// Buscando Evento
app.get('/partners/events', (req, res) => {
    const {name , description, date} = req.body
})

//Buscando evento por ID
app.get('/parteners/events/:eventId', (req, res) => {
    const {eventId} = req.params
    console.log(eventId)
    res.send();
})



app.listen(3000, () => {
    console.log('running in http://localhost:3000')
})

