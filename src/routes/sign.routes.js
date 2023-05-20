import { Router } from "express";
import { signIn, signUp } from "../controllers/sign.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { signinSchema, signupSchema } from "../schemas/sign.schema.js";

const sign = Router()

sign.post("/signup",validateSchema(signupSchema, 422), signUp)
sign.post("/signin",validateSchema(signinSchema, 422), signIn)

export default sign