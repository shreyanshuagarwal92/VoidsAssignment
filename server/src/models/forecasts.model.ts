import { DataTypes, Model } from "sequelize";
import { Database } from "../configs/db.config";

const sequelize = Database.getInstance().getSequelize();

class Forecasts extends Model {
  public date: Date;
  public location: string;
  public forecasted_sales_quantity: number;
}

Forecasts.init(
  {
    date: {
      type: DataTypes.DATE,
    },
    location: {
      type: DataTypes.STRING(12),
    },
    forecasted_sales_quantity: {
      type: DataTypes.FLOAT,
    },
  },
  {
    sequelize,
    schema: "oneglass",
    tableName: "forecasts",
    timestamps: false, // disable timestamps
    defaultScope: {
      attributes: { exclude: ["id"] }, // exclude id from default select query
    },
  }
);

export { Forecasts };
