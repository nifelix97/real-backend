// ============================================
// 👤 USER MODEL — Database table definition for users
// ============================================
// A "Model" in Sequelize represents a database table.
// Each property we define becomes a column in that table.

import { DataTypes, Model } from "sequelize";
// DataTypes: Defines the type of each column (STRING, UUID, etc.)
// Model: The base class that our models extend.

import sequelize from "../../config/db.js";
// The database connection that this model will use.

// ============================================
// 🏗️ DEFINING THE USER MODEL
// ============================================
// We create a class that extends Sequelize's Model class.
// Then we call User.init() to define the table structure.

class User extends Model {}

User.init(
  {
    // id: Unique identifier for each user (UUID format)
    id: {
      type: DataTypes.UUID, // Universally Unique Identifier
      defaultValue: DataTypes.UUIDV4, // Auto-generate a random UUID
      allowNull: false, // This field is required
      primaryKey: true, // This is the primary key
    },
    fullName: {
      type: DataTypes.STRING, // VARCHAR equivalent in SQL
      allowNull: false, // Every user must have a name
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true, // No two users can have the same email
    },
    PhoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, // Every user needs a password
    },
    // role: Controls what the user is allowed to do
    role: {
      type: DataTypes.STRING,
      enum: ["admin", "customer", "seller"], // Only these values allowed
      defaultValue: "customer", // New users start as customers
      allowNull: false,
    },
    // status: Whether the user account is active
    status: {
      type: DataTypes.STRING,
      enum: ["active", "inactive", "blocked"],
    },
  },
  {
    sequelize, // The database connection
    modelName: "User", // Name Sequelize uses internally
    tableName: "Users", // Actual table name in the database
    timestamps: true, // Automatically add createdAt & updatedAt columns
  },
);

export default User;
