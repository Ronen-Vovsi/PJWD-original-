if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

// Imports
const path = require('path')

const express = require('express')
const app = express()
const port = 5000
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const initializePassport = require('./passport-config')
initializePassport(
    passport, 
    username => users.find(user => user.username === username),
    id => users.find(user => user.id === id)
)

const users = []

// Static files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public.js'))

// views
/*app.set('views', './views')
app.set('view engine', 'ejs')*/
app.set('views', path.join(__dirname,'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

// Rendering
app.get('', checkAuthenticated, (req, res) => {
    res.render('login')
})

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login')
})


app.post('/login', passport.authenticate('local', {
    successRedirect: '/ToDoList',
    failureRedirect: '/login',
    failureFlash: true
}
))

app.get('/signUp', (req, res) => {
    res.render('signUp')
})

app.post('/signUp', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push ({
            id: Date.now().toString(),
            username: req.body.username,
            password: hashedPassword
        })
        res.redirect('/login')
    } catch {
        res.redirect('/signUp')
    }
    console.log(users)
})

app.get('/ToDoList', (req, res) => {
    res.render('index', { name: req.user.name })
})

// Logout
/*app.delete('/logOut', (req, res,) => {
    req.logOut()
    res.redirect('/login')
})*/
app.post('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });

// Function to check if user is authenticated
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}
// Function to check if user is not authenticated
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/ToDoList')
    }
    next()
}

// Listen
app.listen(port, () => console.info(`Listening on port ${port}`))