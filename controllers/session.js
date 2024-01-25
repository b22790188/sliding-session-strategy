let { Session, sessionExtension } = require('../utils/session/session');
let uuid = require('uuid');

const User ={
    "user1": "password1",
    "user2": "password2"
}

const sessions = {}

exports.signIn = function(req, res){
    let { username, password } = req.body;  

    console.log(username)
    if(!(username in User)){
        return res.status(400).send("User not found");
    }

    if(User[username] !== password){
        return res.status(400).send("Wrong password");
    }

    let expiresAt = Date.now() + 120 * 1000;
    let session = new Session(username, expiresAt) 

    const sessionToken = uuid.v4();    

    sessions[sessionToken] = session;

    console.log(sessions);

    res.status(200).cookie('session_token', sessionToken,{expires: new Date(expiresAt)}).send();
}

exports.welcome = function(req, res){
    let sessionToken = req.cookies.session_token;

    if(!sessionToken){
        return res.status(401).send('Unauthorized');
    }

    console.log(sessions)
    let session = sessions[sessionToken];
    
    if(session.expiresAt < Date.now()){
        return res.status(401).send('token expired');
    }

    sessionExtension(session);

    res.status(200).cookie('session_token', sessionToken,{expires: new Date(session.expiresAt)}).send(`Welcome ${session.username}`);
}