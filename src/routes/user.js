// ============================================
// 🚦 USER ROUTES — Defines URL endpoints for user operations
// ============================================
// Routes connect HTTP methods (GET, POST, PUT, DELETE) and URLs
// to the controller functions that handle the logic.
//
// express.Router() creates a group of routes that we can
// attach to the main app with app.use().

import express from "express";
import {
  getAllUsers,
  SingleUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.js";

const UserRoutes = express.Router();

// GET /api/getAllUsers — Get all users (only admin and seller)
// The Protect middleware runs first (checks JWT token).
// Then AllowedRoles checks that the user is admin or seller.
// Finally, getAllUsers controller runs.
UserRoutes.get("/api/users", getAllUsers);

// GET /api/getUser/:id — Get a single user by ID
// ":id" is a URL parameter — Express stores it in req.params.id
UserRoutes.get("/api/user/:id",SingleUser);

// PUT /api/updateUser/:id — Update a user by ID
UserRoutes.put(
  "/api/user/:id",
  updateUser,
);

// POST /api/createUser — Create a new user (no auth required — anyone can register)
UserRoutes.post("/api/createUser", createUser);

// DELETE /api/deleteUser/:id — Delete a user by ID
UserRoutes.delete("/api/user/:id", deleteUser);

export default UserRoutes;
