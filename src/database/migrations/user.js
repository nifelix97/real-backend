import sequelize from "../../config/db.js";
import User from "../models/user.js";



export const createUserTable = async () => {
    await sequelize.authenticate();

    await User.sync({alter: true, logging: false}); // This will create the table if it doesn't exist (and do nothing if it already exists)

    console.log("User table created or already exists.");
}