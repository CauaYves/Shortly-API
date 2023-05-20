import { getTenLastRanked } from "../services/ranking.service.js"

export async function getRanking(req, res) {
    try {
        const answer = await getTenLastRanked()
        res.send(answer)
    }
    catch (error) {
        res.send(error.message)
    }
}