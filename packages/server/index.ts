import express from "express";
import type { Request, Response } from "express";
import dotenv from 'dotenv'

dotenv.config()
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send(process.env.OPENAI_API_KEY)
})

app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port} 运行中`)
})