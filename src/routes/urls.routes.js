import { Router } from "express";
import { deleteUrl, getOpenUrls, getUrlsById, postUrls } from "../controllers/urls.controller.js";
import { validateId } from "../middlewares/validateSchema.js";
import { urlschema } from "../schemas/url.schema.js";

const urls = Router()

urls.post("/urls/shorten", postUrls)
urls.get("/urls/:id", getUrlsById)
urls.get("/urls/open/:shortUrl", getOpenUrls)
urls.delete("/urls/:id",validateId(urlschema, 401), deleteUrl)

export default urls