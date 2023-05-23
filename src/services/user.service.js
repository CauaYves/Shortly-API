import db from "../database/database.connection.js"
export async function getVisitorsFromUserProfile(userid) {

    const querystring = `
    SELECT
    COALESCE(SUM("visitcount"), 0) AS "visitcount",
    COALESCE(json_agg(json_build_object(
      'id', id,
      'shorturl', "shorturl",
      'url', url,
      'visitcount', "visitcount"
    )), '[]'::json) AS "shortenedUrls"
  FROM urls
  WHERE "userId" = $1;
  
    `
        

    const tableData = await db.query(querystring, [userid])

    if (tableData.rowCount === 0) return null
    return tableData.rows[0]
}