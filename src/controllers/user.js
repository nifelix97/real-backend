// ============================================
// 👤 USER CONTROLLER — Handles user-related requests
// ============================================
// Controllers are the "C" in MVC (Model-View-Controller).
// They contain the logic that runs when a user visits a URL endpoint.
// Each function here corresponds to a route defined in the routes files.

import User from "../database/models/user.js";
import bcrypt from "bcrypt";
// bcrypt is used to hash (encrypt) passwords so we never store them as plain text.

// ============================================
// 📋 GET ALL USERS
// ============================================
// async/await: Modern JavaScript syntax for working with Promises.
// An "async" function always returns a Promise. "await" pauses execution
// until the Promise resolves.
// req = request object (contains info about the HTTP request)
// res = response object (used to send back the HTTP response)

export const getAllUsers = async (req, res) => {
  // try/catch: Handles errors gracefully. If any code inside "try" throws an error,
  // execution jumps to the "catch" block.
  try {
    // User.findAll() is a Sequelize method that returns ALL users from the database
    const users = await User.findAll();
    // res.status(200) sets the HTTP status code to 200 (OK)
    // .json() sends the response as JSON format
    res.status(200).json(users);
    console.log("all users", users);
  } catch (error) {
    // 500 = Internal Server Error
    res.status(500).json({ error: error.message });
  }
};

// ============================================
// 🔍 GET SINGLE USER BY ID
// ============================================

export const SingleUser = async (req, res) => {
  try {
    // req.params.id reads the "id" from the URL (e.g., /api/getUser/123)
    // findByPk() = "find by primary key" — finds a user by their ID
    const user = await User.findByPk(req.params.id);
    if (!user) {
      // 404 = Not Found
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ============================================
// ➕ CREATE USER
// ============================================
// Demonstrates object destructuring: {password, ...userData} = req.body
// This extracts "password" and puts everything else into "userData".

export const createUser = async (req, res) => {
  try {
    const { password, ...userData } = req.body;
    // Check if the email is already registered
    const existing = await User.findOne({ where: { email: userData.email } });
    if (existing)
      // 400 = Bad Request
      return res.status(400).json({ message: "email already used" });
    // Hash the password before storing it (security best practice)
    // 10 = number of salt rounds (higher = more secure, slower)
    const hashedPassword = await bcrypt.hash(password, 10);
    // Spread syntax (...userData) copies all properties from userData into the new object
    const user = await User.create({ ...userData, password: hashedPassword });
    // 201 = Created (standard for resource creation)
    res.status(201).json({ message: "user registered successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ============================================
// ✏️ UPDATE USER
// ============================================

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user)
      return res
        .status(404)
        .json({
          message:
            "User not Found , we can not update user that is not in the sysem",
        });
    // user.update() modifies the existing record with the data from req.body
    await user.update(req.body);
    res.status(200).json({ message: "user updated successfuly", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ============================================
// 🗑️ DELETE USER
// ============================================

export const deleteUser = async (req, res) => {
  try {
    const delUser = await User.findByPk(req.params.id);
    if (!delUser) return res.status(404).json({ message: "user not found" });
    // .destroy() removes the record from the database
    await delUser.destroy();
    res.status(200).json({ message: "user deleted successfuly" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
