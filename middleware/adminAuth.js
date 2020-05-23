module.exports = function(req,res,next){
    if(!req.user.isAdmin) return res.send('User is Not Admin.');
    next();
}