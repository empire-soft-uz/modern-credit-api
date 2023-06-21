import express, { Application } from 'express'
import { router } from './routes'
const bodyParser = require('body-parser')

const app: Application = express()

//Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
//registretion router
app.use(router)

export { app }