import { checkIfUserExists, createUser, insertTokenOnDB } from "../services/auth.service.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

export async function signUp(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).send("senhas não coincidem");
    }

    try {
        const userExists = await checkIfUserExists(email);
        if (!userExists) {
            return res.status(409).send("usuário já existente");
        }

        await createUser(name, email, password);
        res.sendStatus(201);
    } catch (error) {
        res.send(error.message);
    }
}

export async function signIn(req, res) {
    const { email, password } = req.body;

    try {
        const userExists = await checkIfUserExists(email)
        if (!userExists && !bcrypt.compareSync(password, userExists.password)) {
            return res.status(401).send("credenciais inválidas")
        }

        const token = Jwt.sign({ userId: userExists.id, name: userExists.name }, process.env.SECRET_KEY, {
            expiresIn: '1d'
        })
        const obj = { token, name: userExists.name }
        await insertTokenOnDB({ token, name: userExists.name })

        return res.status(200).send(obj)
    } catch (error) {
        return res.status(500).send(error);
    }
}
