import { verifyToken } from "../services/urls.service.js"
import { getVisitorsFromUserProfile } from "../services/user.service.js"

export async function getUsers(req, res) {
    try {
        const { authorization } = req.headers
        const token = authorization.replace("Bearer ", "")

        const userData = await verifyToken(token)

        if (userData === null) return res.sendStatus(401)

        const { userId, name } = userData
        const { visitCount, shortenedUrls } = await getVisitorsFromUserProfile(userData.userId)

        const table = {
            id: userId,
            name,
            visitCount,
            shortenedUrls
        }

        return res.send(table)
    }
    catch (error) {
        res.send(error.message)
    }
}