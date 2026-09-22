import express from "express";
import sequelize from "./src/config/db.js";
import "dotenv/config";


const app = express();

const PORT = process.env.PORT || 5000;



sequelize
.authenticate()
.then(
    () =>{
        console.log("your database connnect successfully");
        return sequelize.sync();
    }
)
.then(
    () =>
        app.listen(PORT, ()=> console.log(`your server is running on port ${PORT}`)),
)
.catch((error) => console.log("enable to connect to the database:", error));


export default app