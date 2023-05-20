import { nanoid } from "nanoid"
import { receiveCookie } from "../services/auth.service.js"
import { checkToken, getNanoidById, getUrlDataById, incrementVisitors } from "../services/urls.service.js"
import db from "../database/database.connection.js"

export async function postUrls(req, res) {
    try {
        const { url } = req.body

        const cookie = await receiveCookie(req)
        if (cookie === null) return res.sendStatus(401)

        const resp = await checkToken(req, cookie)
        if (resp === null) return res.sendStatus(401)

        const nanoidurl = nanoid(8)


        const query = "INSERT INTO urls (shorturl, url, visitcount, userid, createdat) VALUES($1, $2, $3, $4, to_timestamp($5))"
        const values = [nanoidurl, url, 0, cookie.userId, Date.now()]
        await db.query(query, values)

        const urls = await getNanoidById(nanoidurl)

        res.send(urls)
    }
    catch (error) {
        res.send(error.message)
    }
}
export async function getUrlsById(req, res) {
    const { id } = req.params
    try {
        const url = await getUrlDataById(id)
        if (url === null) return res.sendStatus(404)
        res.send(url)
    }
    catch (error) {
        res.send(error.message)
    }
}
export async function getOpenUrls(req, res) {
    const { shortUrl } = req.params
    try {
        const answer = await incrementVisitors(shortUrl)
        if(answer === null) return res.sendStatus(404)
        
        return res.redirect(answer)
    }
    catch (error) {
        res.send(error.message)
    }
}
export async function deleteUrl() {
    try {

    }
    catch (error) {
        res.send(error.message)
    }
}