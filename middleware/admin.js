module.exports = function(req,res,next) {
    // 403 for the forbidden
    // 401 is when unauthorized user try to access somt 
    if(!req.user.isAdmin) return res.status(403).send('Access Denined')
    next()
}