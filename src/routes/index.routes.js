import { Router } from "express"
import sign from "./sign.routes.js"
import urls from "./urls.routes.js"
import users from "./users.routes.js"
import ranking from "./ranking.routes.js"

const routes = Router()

routes.use(sign)
routes.use(urls)
routes.use(users)
routes.use(ranking)

export default routes