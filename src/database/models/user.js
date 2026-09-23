
import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/db.js';



class User extends Model {}


User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,

      validate: {
        notEmpty: {
          msg: "Password is required",
        },

        len: {
          args: [8, 100],
          msg: "Password must be between 8 and 100 characters",
        },

        isStrongPassword(value) {
          if (!/[A-Z]/.test(value)) {
            throw new Error(
              "Password must contain at least one uppercase letter",
            );
          }

          if (!/[a-z]/.test(value)) {
            throw new Error(
              "Password must contain at least one lowercase letter",
            );
          }

          if (!/[0-9]/.test(value)) {
            throw new Error("Password must contain at least one number");
          }

          if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
            throw new Error(
              "Password must contain at least one special character",
            );
          }
        },
      },
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
  },
);

export default User;