module.exports = {
    getProfile: async (req, res) => {
        const { id } = req.params
        const db = req.app.get('db').profiles
        
        try {
            let user_data = await db.get_profile(id)
            user_data = user_data[0]

            let data = {...user_data, logged: true}

            return res.status(200).send(data)
        }
        catch {
            return res.status(401).send({ logged: false })
        }    
    },
    updateProfile: async (req, res) => {
        const { id } = req.params
        const { name_first, name_last, gender, age, city, state, img_profile } = req.body.profile
        const db = req.app.get('db').profiles

        try {
            let user_data = await db.update_profile([id, name_first, name_last, age, gender, city, state, img_profile])
            return res.status(200).send(user_data)
        }
        catch {
            return res.sendStatus(500)
        }
    },
    newProfile: async (req, res) => {
        const { name_first, name_last, gender, age, city, state, img_profile } = req.body.profile
        const db = req.app.get('db').profiles

        try {
            let user_data = await db.new_profile({name_first, name_last, gender, age, city, state, img_profile})
            return res.status(200).send(user_data)
        }
        catch {
            return res.sendStatus(500)
        }

    }
}