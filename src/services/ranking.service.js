import db from "../database/database.connection.js"

export async function getTenLastRanked() {
    const answer = await db.query(`
            SELECT
                u.id,
                u.name,
                COUNT(l.id) AS "linkscount",
                COALESCE(SUM(l."visitcount"), 0) AS "visitcount"
            FROM
                users u
            LEFT JOIN
                urls l ON u.id = l."userid"
            GROUP BY
                u.id,
                u.name
            ORDER BY
                "visitcount" DESC
            LIMIT 10
        `)
    return answer.rows
}