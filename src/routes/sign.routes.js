import { Router } from "express";
import { signIn, signUp } from "../controllers/sign.controller.js";

const sign = Router()

sign.post("/signup", signUp)
sign.post("/signin", signIn)

export default sign