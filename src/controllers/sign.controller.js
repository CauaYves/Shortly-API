import { checkIfUserExists, createUser, searchUserByEmail } from "../services/auth.service.js";
import bcrypt from "bcrypt";


export async function signUp(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).send("senhas não coincidem");
    }

    try {
        const userExists = await checkIfUserExists(email);
        if (userExists) {
            return res.status(409).send("usuário já existente");
        }

        await createUser(name, email, password);
        res.sendStatus(201);
    } catch (error) {
        res.send(error.message);
    }
}

export async function signIn(req, res) {

    const { email, password } = req.body

    try {
        const userExists = await checkIfUserExists(email);
        if (!userExists) {
            return res.status(401).send("usuário não existe");
        }
        const user = await searchUserByEmail(email)
        if (!bcrypt.compareSync(password, user.password)) return res.sendStatus(401)
        return res.sendStatus(200)
    }
    catch (error) {
        res.send(error.message)
    }
}
