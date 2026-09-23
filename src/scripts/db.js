import sequelize from "../config/db.js";
import "../database/index.js";
import {createUserTable} from "../database/migrations/user.js";
import {createProductTable} from "../database/migrations/product.js";
import {seedUsers} from "../database/seeds/user.js";


const syncDatabase = async () => {
    try{
        console.log("Syncing database...");
        await sequelize.authenticate();
        console.log("Database connection established successfully.");
        await createUserTable();
        await createProductTable();

        await sequelize.sync({ alter: true, logging: false }); // This will create the tables if they don't exist (and do nothing if they already exist)
        await seedUsers();
        console.log("database synced successfully.");

        process.exit(0); // Exit the process after syncing
    } catch (error) {
        console.error("Error syncing database:", error);
        process.exit(1); // Exit with an error code
    }
};

syncDatabase();