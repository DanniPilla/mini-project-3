const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../lib/dbConnect");
const sequelizeInstance = dbConnect.Sequelize;
class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      required: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      required: true,
    },
    stock_quantity: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      required: true,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
      references: {
        model: "categories",
        key: "id",
      },
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "products",
    formattimestamps: true,
    freezeTableName: true,
  }
);
module.exports = Product;
