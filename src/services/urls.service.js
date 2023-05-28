import db from "../database/database.connection.js"
import jwt from "jsonwebtoken"

export async function checkToken(req) {
    const { authorization } = req.headers
    const token = authorization.replace("Bearer ", "")
    const databaseToken = await db.query('SELECT id FROM users WHERE "refreshToken" = $1', [token])
    const id = databaseToken.rows[0]
    return id
}
export async function getNanoidById(nanoid) {
    const urls = await db.query(`SELECT id, "shortUrl" FROM urls WHERE "shortUrl" = $1;`, [nanoid]);
    if (urls.rowCount === 0) return null
    return urls.rows[0]
}
export async function getUrlDataById(id) {
    const answer = await db.query(`SELECT id, "shortUrl", url FROM urls WHERE id = $1;`, [id]);
    if (answer.rowCount === 0) return null
    return answer.rows[0]
}
export async function incrementVisitors(shorturl) {
    const query = `UPDATE urls SET "visitCount" = "visitCount" + 1 WHERE "shortUrl" = $1 RETURNING url`;
    const values = [shorturl];
    const res = await db.query(query, values)
    if (res.rowCount === 0) return null
    return res.rows[0].url
}
export async function getUrlUser(id) {
    const answer = await db.query(`SELECT id, "shortUrl", url, "userId" FROM urls WHERE id = $1;`, [id]);
    if (answer.rowCount === 0) return null
    return answer.rows[0]
}
export async function deleteUrlDatabaseById(id) {

    await db.query("DELETE FROM urls WHERE id = $1;", [id])

}

export async function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const { userId, name } = decoded;
        return { userId, name };
    } catch (error) {
        return null;
    }
}


