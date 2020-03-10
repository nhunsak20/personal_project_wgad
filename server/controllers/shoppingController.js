module.exports = {
    getProducts: (req, res) => {
        const db = req.app.get('db').products

        return db.get_products().then(dbObj => {
            return res.status(200).send(dbObj.data)
        }).catch(err => {
            return res.sendStatus(400)
        })
    },
    getProduct: async (req, res) => {
        const { id } = req.params
        const db = req.app.get('db').products

        try {
            let data = await db.get_product(id)
            return res.status(200).send(data)
        }
        catch {
            return res.sendStatus(400)
        }
    },
    new: async (req, res) => {
        const { name, price, describle, img } = req.body.products
        const db = req.app.get('db').products

        try {
            let data = await db.add_product({name, price, describle, img})
            return res.status(200).send(data)
        }
        catch {
            return res.sendStatus(500)
        }
    },
    update: async (req, res) => {
        const { id } = req.params
        const { name, price, describle, img } = req.body.products
        const db = req.app.get('db').products

        try {
            let data = await db.update_product({id, name, price, describle, img})
            return res.status(200).send(data)
        }
        catch {
            return res.sendStatus(500)
        }
    },
    remove: async (req, res) => {
        const { id } = req.params
        const db = req.app.get('db').products
        try {
            let data = await db.delete_product(id)
            return res.status(200).send(data)
        }
        catch {
            return res.sendStatus(400)
        }
    }

}