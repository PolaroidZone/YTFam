if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')

const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const initializePassport = require('./passport-config')
initializePassport(
    passport, 
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

const users = []

//set static files
app.use(express.static('public'))
app.use('/styles', express.static(__dirname +'public/styles'))
app.use('/pics', express.static(__dirname + 'public/pics'))
app.use('/icon', express.static(__dirname + 'pubilc/icon'))
app.use('/js', express.static(__dirname + "public/js"))
app.use('/video', express.static(__dirname + 'public/video'))

//set Templating Engine
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false}))
app.use(flash())

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session()) //workes withh app.use(session)***used to make variables persistent
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
    
    if (req.isAuthenticated()) {
        res.render('index.ejs',  {name: req.user.name})
   }else {
       res.render('index.ejs', {name: 'Guest'})
   }
})

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

app.get('/signup', checkNotAuthenticated, (req, res) => {
    res.render('signup.ejs')
})

app.post('/signup', checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/login')
    } catch {
        req.redirect('/signup')
    }
   console.log(users)
})


app.get('/play-', (req, res) => { 
    if (req.isAuthenticated()) {
        res.render('video-play.ejs', {name: req.user.name})
   }else {
       res.render('video-play.ejs', {name: 'Guest'})
   }
})

app.get('/studio', chechAuthenticated, (req, res) => {
         res.render('dashboard.ejs', {name: req.user.name})
})

app.delete('/logout', function(req, res) {//new logout function syntax
    req.logOut(function(err) {
        if (err) {
            return next(err);
        } 
        res.redirect('/login')
    })
   
})

/** post methods*/
function chechAuthenticated(req, res, next) {//checking if user is auth
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/')
}

function checkNotAuthenticated(req, res, next) {//stop user from signing in again
    if (req.isAuthenticated()){
        return res.redirect('/')
    }
    next()
}

app.listen(3000)

console.log('listening on http://localhost:3000')


