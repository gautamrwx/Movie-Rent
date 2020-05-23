const jwt = require('jsonwebtoken');
const config = require('config')

module.exports = function (req,res,next){
    const token = req.header('x-auth-token');
    if(!token) return res.send('Pass Token To Authorize..');

    try{
        const decoded = jwt.verify(token,config.get('jwtPrivateKey'));
        req.user = decoded;
        next();
    }
    catch(ex){
        return res.send('Invalid Token Provided ..');
    }
}