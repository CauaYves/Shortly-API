import db from "../database/database.connection.js"

export async function getTenLastRanked() {
    const answer = await db.query(`
            SELECT
                u.id,
                u.name,
                COUNT(l.id) AS linksCount,
                COALESCE(SUM(l.visitcount), 0) AS visitCount
            FROM
                users u
            LEFT JOIN
                urls l ON u.id = l.userid
            GROUP BY
                u.id,
                u.name
            ORDER BY
                visitCount DESC
            LIMIT 10
        `)
    return answer.rows
}