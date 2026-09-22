import { Sequelize } from "sequelize";

import dotenv from "dotenv";

dotenv.config();


const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "postgres",
        dialectOptions: {
            connectionTimeout: 3000
        },
        pool:  {
            max: 2,
            min: 0,
            acquire: 3000,
            idle: 10000
        }
    }
)


export default sequelize