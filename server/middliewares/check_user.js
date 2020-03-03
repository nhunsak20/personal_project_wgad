module.exports = {
    check_user: (req, res, next) => {
        if(req.session.user) {
            return res.status(200).send(req.session.user)
        }
        next();
    }
}