module.exports = {
    check_user: (req, res, next) => {
        if(req.session.user) {
            return res.status(200).send(req.session.user)
        }
        next()
    },
    isLogged: (req, res, next) => {
        if(!req.session.user) {
            return res.status(403).send('Please login')
        }
        next()
    },
    isAdmin: (req, res, next) => {
        if(!req.session.user.isAdmin) {
            return res.status(403).send('You are not adminantion')
        }
        next()
    },
    isBoard: (req, res, next) => {
        if(!req.session.user.isBoard) {
            return res.status(403).send('You are not board member of WGAD')
        }
        next()
    }
}