import { receiveCookie } from "../services/auth.service.js"

export async function postUrls(req, res) {
    try {
        const cookie = await receiveCookie(req)
        
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