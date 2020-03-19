const bcrypt = require('bcryptjs')

module.exports = {
    login: async (req, res) => {
        const { email, password } = req.body
        const { session } = req
        const db = req.app.get('db').auth

        let user = await db.check_user_admin(email)
        user = user[0]

        if(!user) {
            user = await db.check_user(email)
            user = user[0]

            if(!user) return res.status(400).send('Email or Username not found...')
        }

        const isAuth = bcrypt.compareSync(password, user.password)

        if(isAuth) {
            session.user = {
                id: user.user_id,
                email: user.email,
                profile_img: user.profile_img,
                isActive: user.isactive,
                isBoard: user.isboard,
                isAdmin: user.isadmin,
                logged: true
            }

            return res.status(202).send(session.user)
        }
        return res.status(400).send('Incorrect password...')
    },
    register: async (req, res) => {
        const { email, password } = req.body
        const { session } = req
        const db = req.app.get('db').auth

        let user = await db.check_user(email)
        user = user[0]

        if(user) {
            return res.status(400).send('User already exist...')
        }

        const random = Math.floor(Math.random() * 21) + 1
        const profile_img = `https://robohash.org/${random}`

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        try {
            let newUser = await db.register_user([email, hash, profile_img])
            newUser = newUser[0]

            session.user = {
                id: newUser.user_id,
                email: newUser.email,
                profile_img: newUser.profile_img,
                logged: true
            }
            return res.status(200).send(session.user)
        }
        catch {
            return res.sendStatus(500)
        }
    },
    logout: (req, res) => {
        if(req.session.user) {
            req.session.destroy()
            res.sendStatus(200)
        }
    }
}