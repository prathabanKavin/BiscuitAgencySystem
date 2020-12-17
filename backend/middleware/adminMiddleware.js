const admin = (req, res, next) => {
    if(req.user && req.user.isMainAdmin){
        next()
    } else {
        res.status(401)
        throw new Error('Not authorized as an admin')
    }
}

module.exports = admin