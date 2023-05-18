import { receiveCookie } from "../services/auth.service.js"

export async function postUrls(req, res) {
    try {
        const { url } = req.body
        const cookie = await receiveCookie(req)

        if(cookie === null) return res.sendStatus(401)

        res.send(cookie)
    }
    catch (error) {
        res.send(error.message)
    }
}
export async function getUrlsById() {
    try {

    }
    catch (error) {
        res.send(error.message)
    }
}
export async function getOpenUrls() {
    try {

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