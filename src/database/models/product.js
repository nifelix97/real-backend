import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/db.js";

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, // Product must have a name
    },
    description: {
      type: DataTypes.TEXT, // TEXT allows longer content than STRING
      allowNull: true, // Description is optional
    },
    price: {
      type: DataTypes.FLOAT, // Decimal number (e.g., 19.99)
      allowNull: false,
    },
    images: {
      type: DataTypes.JSON, // Stores an array of image filenames as JSON
      allowNull: true,
    },
    stock: {
      type: DataTypes.INTEGER, // Whole number
      allowNull: false,
      defaultValue: 0, // Default stock is 0
    },
    status: {
      type: DataTypes.STRING,
      enum: ["active", "inactive"], // Only these two statuses
      defaultValue: "active", // New products are active by default
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Product",
    tableName: "Products",
    timestamps: true, // Auto-add createdAt and updatedAt
  },
);

export default Product;
