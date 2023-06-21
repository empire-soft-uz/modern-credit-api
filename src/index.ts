import { DataSource } from "typeorm";
import {app} from './app'

import * as dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 8081
const HOST = process.env.HOST
const USERNAME = process.env.USERNAME
const DATABASE = process.env.DATABASE

const connectDB =  new DataSource({
    type: "postgres",
    host: HOST,
    username: USERNAME,
    database:DATABASE,
    logging: false,
    synchronize: true,
    entities: ["./src/entities/**/*.ts"],})

connectDB
    .initialize()
    .then(() => {
        console.log(`Data Source has been initialized`);
        app.listen(PORT, ()=> {
          console.log(`App is listening on port ${PORT}`);
        })
    })
    .catch((err) => {
        console.error(`Data Source initialization error`, err);
    })

export default connectDB;