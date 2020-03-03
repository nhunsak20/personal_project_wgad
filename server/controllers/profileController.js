module.exports = {
    getProfile: (req, res) => {
        const { id } = req.params
        const db = req.app.get('db')

        let user_data = db.get_profile(id).then(db => {
            return res.status(200).send(db.data)
        }).catch(err => {
            return res.status(500).send(err)
        })

        return user_data   
    },
    updateProfile: (req, res) => {
        const { id } = req.params
        const { name_first, name_last, gender, age, city, state, img_profile } = req.body
        const db = req.app.get('db')

        let user_data = db.update_profile([id, name_first, name_last, age, gender, city, state, img_profile]).then(db => {
            return res.status(200).send(db.data)
        }).catch(err => {
            return res.status(500).send(err)
        })

        return user_data
    }
}