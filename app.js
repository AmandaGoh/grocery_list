var express= require('express')
var mongoose = require('mongoose')
var dotenv= require('dotenv')
var bodyParser = require('body-parser')
var flash = require('connect-flash')
var session = require('express-session')
var passport= require('passport')
var expressValidator = require('express-validator')
var MongoStore = require('connect-mongo')(session)

var app= express()

mongoose.Promise = global.Promise

console.log('the environment is on '+ process.env.NODE_ENV)

dotenv.load({path: '.env.' + process.env.NODE_ENV})
mongoose.connect(process.env.MONGO_URI)

app.use(bodyParser.urlencoded({
  extended: true
}))

require('./config/passport')(passport)

app.set('view engine', 'ejs')

app.use(session({
  secret: process.env.EXPRESS_SECRET,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    url: process.env.MONGO_URI,
    autoReconnect: true
  })
}))
app.use(flash())

//initialize passport
app.use(passport.initialize())
app.use(passport.session())

var login_route = require('./routes/login')
var signup_route = require('./routes/signup')


app.use('/', login_route)
app.use('/signup', signup_route)


app.listen(3000)
console.log('local server running')
