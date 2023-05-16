import { Router } from "express";
import { deleteUrl, getOpenUrls, getUrlsById, postUrls } from "../controllers/urls.controller.js";

const urls = Router()

urls.post("/urls/shorten", postUrls)
urls.get("/urls/:id", getUrlsById)
urls.get("/urls/open/:shortUrl", getOpenUrls)
urls.delete("/urls/:id", deleteUrl)

export default urls