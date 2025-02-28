const express = require('express')
const userRouter = require('./src/routes/user')
const personRouter = require('./src/routes/person')
const database = require('./src/database')
const ApiUser = require('./src/api/user')
const authMiddleware = require('./src/middleware/auth')

const app = express()
const porta = 3000
app.use(express.json())


//create
app.use('/api/v1/user/', ApiUser.Create)

//login
app.use('/api/v1/login/', ApiUser.Login)

//middleware de autentication aqui
app.use(authMiddleware)

app.use('/api/v1/user', userRouter)
app.use('/api/v1/person', personRouter)


database.db
    .sync({ force: false })
    .then((_) => {
        app.listen(porta, () => {
            console.log('servidor rodando na porta ' + porta)
        })
    })
    .catch((e) => {
        console.error(`Não foi possivel conectar com o banco: ${e}`);
        
    })
