import { Router } from "express";
import { getUsers } from "../controllers/users.constroller.js";

const users = Router()

users.get("users/me", getUsers)

export default users