const { STRIPE_SECRET_KEY } = process.env
const stripe = require('stripe')(STRIPE_SECRET_KEY)
const uuid = require('uuid/v4')

module.exports = {
    pay: async (req, res) => {
        const { price, token } = req.body
        try {
            const customer = await stripe.customers.create({
                email: token.email,
                source: token.id
            })
            const idempotencyKey = uuid();
            await stripe.charges.create({
                amount: Number(price * 100),
                customer: customer.id,
                currency: 'usd',
            },
            {
                idempotencyKey
            })
            res.sendStatus(200)
        }
        catch {
            res.sendStatus(400)
        }
    }
}