// checks login and if they are authenticated or not
const rejectUnauthenticated = (req, res, next) =>  {    
    if(req.isAuthenticated()) {
        // if they are authenticated then they can go to the next thing!
        next();
    } else {
        // if not send error message
        res.sendStatus(403);
    }
};

module.exports = { rejectUnauthenticated }