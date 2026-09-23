import User from "../models/user.js";
import bcrypt from "bcrypt";
// bcrypt is a library that securely hashes (scrambles) passwords.
// We never store plain-text passwords in the database.

export const seedUsers = async () => {
  // Hash the password "Test123" with 8 salt rounds.
  // The higher the number, the more secure (but slower).
  const hashPassword = await bcrypt.hash("Test123", 8);

  // An array of user objects to insert into the database.
  // Each object matches the fields defined in the User model.
  const users = [
    {
      fullName: "Admin",
      email: "admin@gmail.com",
      PhoneNumber: "+25078123123",
      password: hashPassword,
    },
    {
      fullName: "Ishimwe Yvette",
      email: "ishimweyvette@gmail.com",
      password: hashPassword,

      password: hashPassword,
    },
    {
      fullName: "Ngabo Salim",
      email: "ngabosalim@gmail.com",
      password: hashPassword,
    },
    {
      fullName: "Ashimwe Esther",
      email: "ashimwesther@gmail.com",
      password: hashPassword,

    },
  ];

  // bulkCreate inserts multiple records at once (more efficient than creating one by one).
  // ignoreDuplicates: true skips records that would cause a duplicate key error.
  await User.bulkCreate(users, { ignoreDuplicates: true });
};
