import express from 'express';

const app = express()

//Configuração para receber um json e tranforma em Objeto 
//para eu pode manipular esses dados
app.use(express.json())

app.get('/', (req, res) => {
    res.json({message: "teste de rota"})
})

//autenticação do usuario
//POST = criação 
app.post('/auth/login', (req,res) =>{
    //pegando os dados no corpo da requisição
    const {email,password} = req.body;
    console.log(email,password)
    res.send()
})

app.listen(3000, () => {
    console.log('running in http://localhost:3000')
})

//