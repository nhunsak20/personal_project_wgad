module.exports = {
    getEvents: (req, res) => {
        const db = req.app.get('db').events

        db.get_events().then(dbObj => {
            return res.status(200).send(dbObj.data)
        }).catch(err => {
            return res.status(400).send(err)
        })
    },
    getEvent: (req, res) => {
        const { id } = req.params
        const db = req.app.get('db').events

        db.get_event(id).then(dbObj => {
            return res.status(200).send(dbObj.data)
        }).catch(err => {
            return res.status(400).send(err)
        })
    },
    new: (req, res) => {
        const { name } = req.body.events
        const db = req.app.get('db').events

        db.new_event({name}).then(dbObj => {
            return res.status(200).send(dbObj.data)
        }).catch(err => {
            return res.status(400).send(err)
        })

    },
    update: (req, res) => {
        const { id } = req.params
        const { name } = req.body.events
        const db = req.app.get('db').events

        db.update_event({id, name}).then(dbObj => {
            return res.status(200).send(dbObj.data)
        }).catch(err => {
            return res.status(400).send(err)
        })
    },
    remove: (req, res) => {
        const { id } = req.params
        const db = req.app.get('db').events

        db.remove_event(id).then(dbObj => {
            return res.status(200).send(dbObj.data)
        }).catch(err => {
            return res.status(400).send(err)
        })

    }
}
