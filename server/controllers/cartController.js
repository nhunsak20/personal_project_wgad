module.exports = {
    getCart: async (req, res) => {
        const { session } = req
        const db = req.app.get('db').carts
        try {
            let carts = await db.get_carts()

            session.cart = carts.map(cart => {
                return {
                    user_id: cart.user_id,
                    product_id: cart.product_id,
                    quantity: cart.quantity
                }
            })
            return res.status(200).send(session.cart)
        }
        catch {
            return res.sendStatus(500)
        }
    },
    addCart: async (req, res) => {
        const { id, product_id, quantity } = req.body
        const { session } = req
        const db = req.app.get('db').carts
        
        let checkProduct = await db.check_product(product_id)
        checkProduct = checkProduct[0]

        if(checkProduct) {
            const total = checkProduct.quantity += quantity
            try {
                let carts = await db.update_carts([product_id, total])
                console.log(carts)
                session.cart = carts.map(cart => {
                    return {
                        user_id: cart.user_id,
                        product_id: cart.product_id,
                        quantity: cart.quantity
                    }
                })
    
                return res.status(200).send(session.cart)
            }
            catch {
                return res.sendStatus(400)
            }
        } else {
            try {
                let carts = await db.add_carts({id, product_id, quantity})
            
                session.cart = carts.map(cart => {
                    return {
                        user_id: cart.user_id,
                        product_id: cart.product_id,
                        quantity: cart.quantity
                    }
                })

                return res.status(200).send(session.cart)
            }
            catch {
                return res.sendStatus(401)
            }
        }
    },
    updateCart: async (req, res) => {
        const { product_id } = req.params
        const { quantity } = req.body
        const { session } = req
        const db = req.app.get('db').carts
        
        try {
            let carts = await db.update_carts([product_id, quantity])
            
            session.cart = carts.map(cart => {
                return {
                    user_id: cart.user_id,
                    product_id: cart.product_id,
                    quantity: cart.quantity
                }
            })

            return res.status(200).send(session.cart)
        }
        catch {
            return res.sendStatus(500)
        }
    },
    removeOneCart: async (req, res) => {
        const { product_id } = req.params
        const { session } = req
        const db = req.app.get('db').carts
        
        try {
            let carts = await db.remove_one_cart(product_id)
            console.log(carts)
            session.cart = carts.map(cart => {
                return {
                    user_id: cart.user_id,
                    product_id: cart.product_id,
                    quantity: cart.quantity
                }
            })

            return res.status(200).send(session.cart)
        }
        catch {
            return res.sendStatus(500)
        }
    },
    removeAllCart: async (req, res) => {
        const db = req.app.get('db').carts

        try {
            await db.remove_all()
            if(req.session.cart) {
                req.session.destroy()
                res.sendStatus(200)
            }
        }
        catch {
            res.sendStatus(400)
        }
    },
    confirmOrder: async (req, res) => {
        const { id } = req.params
        const { orders } = req.body
        const db = req.app.get('db').carts

        try {
            let order = await db.confirm_order({id, orders})
            order = order[0]
            console.log(order)
            res.sendStatus(202)
        }
        catch {
            res.sendStatus(404)
        }
    }
}