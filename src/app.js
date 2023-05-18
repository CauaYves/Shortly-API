import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import routes from "./routes/index.routes.js";

const app = express()

dotenv.config()
app.use(express.json())
app.use(cors())
app.use(routes)

app.listen(process.env.PORT, () => console.log("server running sucessfuly"))