require('dotenv').config();
const express = require('express')
    ,session = require('express-session')
    ,passport = require('passport')
    ,Auth0Stratagy = require('passport-auth0')
    ,massive = require('massive')
    ,bodyParser = require('body-parser')

const {
    SERVER_PORT,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    CONNECTION_STRING
} =  process.env;

const app = express();
// app.use(express.static(_dirname + './../build'))
app.use(bodyParser.json())

massive(CONNECTION_STRING).then(db =>{app.set('db',db)} )

app.use(session({
    secret:SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new Auth0Stratagy({
    domain:DOMAIN,
    clientID:CLIENT_ID,
    clientSecret:CLIENT_SECRET,
    callbackURL:CALLBACK_URL,
    scope:'openid profile'
}, (accessToken, refreshToken, extraParams, profile, done)=> {
    //DB calls here 
    const db = app.get('db');
    let {id, displayName, picture} = profile
    db.find_user([id])
        .then(user=>{
            if(user[0]){
                done(null,user[0].id)
            }else{db.create_user([displayName, picture, id])
                .then((createdUser)=>{
                    done(null, createdUser[0].id)
                })
            }
        })
}))


//accessable through 'req.user'
passport.serializeUser( (primaryKeyID,done)=>{
    done(null, primaryKeyID)
})
passport.deserializeUser( (primaryKeyID,done)=>{
    app.get('db')
        .find_session_user([primaryKeyID])
        .then(user=>{
            done(null, user[0])
        }) 
})


app.get('/auth',passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0',{
    successRedirect:'http://localhost:3000/#/dashboard'
}))
app.get('/auth/logout', (req,res)=>{req.logOut();res.redirect('http://localhost:3000')})
//on the frontend if you ever want to know anything about a user, hit this end point
app.get('/auth/user', (req,res)=>{ 
    req.user
        ?res.status(200).send(req.user)
        :res.status(401).send('git ./out') 
})
app.get('/api/posts', (req,res)=>{
    const db = app.get('db');
    db.find_all_post()
        .then(posts => res.status(200).send(posts))
        .catch(() => res.status(500).send())
})
app.post('/api/new', (req,res)=>{
    const db = app.get('db');
    const {content, name, picture} = req.body.body
    db.create_post(1 ,name, picture, content)
    .then(()=>res.status(200))
    .catch(() => res.status(500).send())
})
app.get('/api/:id', (req,res)=>{
    const db = app.get('db');
    db.find_user_posts(req.user.id)
    .then(posts=>res.status(200).send(posts))
    .catch(() => res.status(500).send())
}) 

app.listen(SERVER_PORT, ()=>{console.log('Connected on port',SERVER_PORT)})