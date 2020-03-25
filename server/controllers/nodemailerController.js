const nodemailer = require('nodemailer')
const { GMAIL_USER, GMAIL_PASS } = process.env

module.exports = {
    purchased: (req, res) => {
        let { price, email } = req.body
        let msg = `
            <h1>Your Pruchased</h1>
            <p>Total: $${price}</p>
            <p>Thank you for your time and have a nice day</p>
        `
        let tranporter = nodemailer.createTransport({
            service: 'gmail',
            secure: false, 
            auth: {
                user: GMAIL_USER,
                pass: GMAIL_PASS
            },
            tsl: {
                rejectUnauthorized: false
            }
        })

        let mailOptions = {
            from: '"Nodemailer Contact" <test@test.com>',
            to: email,
            subject: 'Thank you for your purchase',
            text: "Here is order: ",
            html: msg
        }

        tranporter.sendMail(mailOptions, (error, info) => {
            if(error) {
                return console.log('Nodemailer: ' + error)
            }
            res.sendStatus(200)
        })
    },
    register: (req, res) => {

    }, 
    joined: (req, res) => {

    }
}