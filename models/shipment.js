const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../lib/dbConnect");
const sequelizeInstance = dbConnect;
class Shipment extends Model {}

Shipment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
      references: {
        model: "orders",
        key: "id",
      },
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      unique: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    carrier: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tracking_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Pending",
    },
    shipped_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    delivery_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "shipments",
    formattimestamps: true,
    freezeTableName: true,
  }
);
module.exports = Shipment;
