var express= require('express')
var mongoose = require('mongoose')
var dotenv= require('dotenv')
var bodyParser = require('body-parser')
var flash = require('connect-flash')
var session = require('express-session')
var passport= require('passport')
var expressLayouts = require('express-ejs-layouts')
var MongoStore = require('connect-mongo')(session)

var app= express()

mongoose.Promise = global.Promise

console.log('the environment is on '+ process.env.NODE_ENV)

// if (process.env.NODE_ENV != 'production') {
// }

dotenv.load({path: '.env.' + process.env.NODE_ENV})
mongoose.connect(process.env.MONGO_URI)

app.use(bodyParser.urlencoded({
  extended: true
}))

require('./config/passport')(passport)

app.use(express.static(__dirname + '/public'))

app.set('view engine', 'ejs')
app.use(expressLayouts)


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
var ajax_route = require('./routes/list_api')

app.get('/', function (req, res){
  res.redirect('/login')
})

app.get('/logout', function (req,res){
  req.logout()
  res.redirect('/login')
})

app.use('/login', login_route)
app.use('/signup', signup_route)
app.use('/api/list', ajax_route)


app.listen(process.env.PORT || 3000)
console.log('local server running')
