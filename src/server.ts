import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import routes  from "./routes"
import cors from "cors"

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use("/api", routes);

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})


const server = app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

module.exports = server
