const cookieSession = require('cookie-session');
// create session that can be accessed by the backend
const serverSessionSecret = () => {
    if(
        !process.env.SERVER_SESSION_SECRET || 
        process.env.SERVER_SESSION_SECRET.length < 8
    ) {
        return process.env.SERVER_SESSION_SECRET;
    }
};

// create the cookie session for a user
module.exports = cookieSession({
    secret: serverSessionSecret() || 'secret',
    key: 'user',
    resave: 'false',
    saveUninitialized: false,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    secure: false,
})