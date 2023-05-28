import db from "../database/database.connection.js"
export async function getVisitorsFromUserProfile(userid) {

  const querystring = `
    SELECT
    COALESCE(SUM("visitCount"), 0) AS "visitCount",
    COALESCE(json_agg(json_build_object(
      'id', id,
      "shortUrl", "shortUrl",
      'url', url,
      "visitCount", "visitCount"
      )), '[]'::json) AS "shortenedUrls"
    FROM urls
    WHERE "userId" = $1;
    `

  const tableData = await db.query(querystring, [userid])
  console.log(tableData)
  if (tableData.rowCount === 0) return null
  return tableData.rows[0]
}