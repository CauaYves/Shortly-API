import db from "../database/database.connection.js"
export async function getVisitorsFromUserProfile(userid) {
    const querystring = `
    SELECT
        SUM("visitCount") AS visitCount,
        json_agg(json_build_object(
            'id', id,
            'shortUrl', shorturl,
            'url', url,
            'visitCount', "visitCount"
        )) AS shortenedUrls
    FROM urls
    WHERE userid = $1;
`;

    const tableData = await db.query(querystring, [userid])

    if (tableData.rowCount === 0) return null
    return tableData.rows[0]
}