import db from "../database/database.connection.js"

export async function signUp(req, res) {
    const { name, email, password, confirmPassword } = req.body

    if (password !== confirmPassword) return res.status(400).send("senhas não coincidem")
    try {

        const userNotExist = await db.query('SELECT * FROM users WHERE email = $1;', [email]);
        console.log(userNotExist.rowCount)
        if (userNotExist.rowCount !== 0) return res.status(409).send("usuário já existente")

        const querystring = `INSERT INTO users (name, email, password, createdat) VALUES ($1, $2, $3, to_timestamp($4));`
        const timestamp = new Date().getTime()

        const values = [name, email, password, timestamp]
        await db.query(querystring, values)
        res.sendStatus(201)
    }
    catch (error) {
        res.send(error.message)
    }
}

export async function signIn() {
    try {
        console.log("asdaisd")
    }
    catch (error) {
        res.send(error.message)
    }
}