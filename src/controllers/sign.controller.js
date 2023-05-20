import { serialize } from "cookie";
import { checkIfUserExists, createToken, createUser, searchUserByEmail } from "../services/auth.service.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

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
    const { email, password } = req.body;

    try {
        const userExists = await checkIfUserExists(email);
        if (!userExists) {
            return res.status(401).send("Usuário não existe");
        }

        const user = await searchUserByEmail(email);
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).send("Credenciais inválidas");
        }

        const token = Jwt.sign({ userId: user.id, name: user.name }, "redflag", {
            expiresIn: '1d'
        });

        return res.status(200).send({ token });
    } catch (error) {
        return res.status(500).send("Erro ao fazer login");
    }
}
