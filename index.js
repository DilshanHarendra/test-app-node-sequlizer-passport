const dotenv = require('dotenv');
const express = require('express')
const session = require('express-session')
var passport = require('passport');
var cookieParser = require('cookie-parser');


dotenv.config()
const app = express()

//config
const db= require('./connections/databaseConnection')
const sessionConfig = require('./config/sessionConfig.json')


// routers
const foodsRouter = require('./routers/foodsRouter')
const menuRouter = require('./routers/menuRouter')
const authRouter = require('./routers/auth')
const userRoute = require('./routers/userRouter')


//middleware
const authMiddleware = require('./middleware/authMiddleware')
const path = require("path");



app.set('view engine', 'ejs')
app.use(cookieParser());
app.use(session({"secret": process.env.SESSION_SECRET||'secretKey', ...sessionConfig}))
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));



// connect DB
db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.error( err))


//routers
app.use('/menus',authMiddleware,menuRouter)
app.use('/foods',authMiddleware,foodsRouter)
app.use('/user',authMiddleware,userRoute)
app.use('/auth',authRouter)





app.get('/error',(req,res)=>{
    res.render('error')
})

app.listen(8000,()=>console.log("app run on  http://localhost:8000"))

