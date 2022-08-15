const dotenv = require('dotenv');
dotenv.config()
const env = process.env.NODE_ENV || 'dev';
const express = require('express')
const app = express()
const session = require('express-session')

//config
const db= require('./connections/databaseConnection')
const sessionConfig = require('./config/sessionConfig.json')


// routers
const foodsRouter = require('./routers/foodsRouter')
const menuRouter = require('./routers/menuRouter')



//middleware
const auth = require('./middleware/authMiddleware')



app.use(session({
    "secret": process.env.SESSION_SECRET||'secretKey',
    ...sessionConfig,
}))


// Test DB
db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.error( err))


//routers
app.use('/menus',auth,menuRouter)
app.use('/foods',auth,foodsRouter)



app.listen(8000,()=>console.log("app run on  http://localhost:8000"))

