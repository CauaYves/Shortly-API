import { serialize } from "cookie";
import { checkIfUserExists, createToken, createUser, searchUserByEmail } from "../services/auth.service.js";
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

        const token = await createToken(user.id, user.name)

        if (!bcrypt.compareSync(password, user.password)) return res.sendStatus(401)

        const cookieValue = {
            token: token,
            userId: user.id,
            name: user.name,
        }

        const cookieOptions = {
            httpOnly: true, //
            maxAge: 7 * 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        }
        const serializedCookie = serialize('cookieName', JSON.stringify(cookieValue), cookieOptions);

        res.setHeader('Set-Cookie', serializedCookie)
        
        return res.status(200).send({ token: token })
    }
    catch (error) {
        res.send(error.message)
    }
}
