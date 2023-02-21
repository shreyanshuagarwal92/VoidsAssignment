import moment from "moment";
import { Op } from "sequelize";
import { ISalesTemperatureObj } from "../interfaces/alert.interface";
import { IForecastsDateRange } from "../interfaces/forecasts.interface";
import { Forecasts } from "../models/forecasts.model";
import { WeatherService } from "./weather.service";

class ForecastsService {
  static findByDate = async (
    startDate: Date,
    endDate: Date
  ): Promise<Forecasts[]> => {
    try {
      const forecasts = await Forecasts.findAll({
        where: {
          date: {
            [Op.between]: [startDate, endDate],
          },
        },
      });
      return forecasts;
    } catch (error) {
      throw error;
    }
  };
  static getSalesAndTemperature = async (data: IForecastsDateRange) => {
    try {
      const salesTemperatureObj: ISalesTemperatureObj = {};
      const locations: Set<string> = new Set();
      const { startDate, endDate } = data;
      const forecasts = await ForecastsService.findByDate(
        new Date(startDate),
        new Date(endDate)
      );
      for (const salesFObj of forecasts) {
        const { date, location, forecasted_sales_quantity } = salesFObj;
        const currDate = moment(date).format("YYYY-MM-DD");
        locations.add(location);
        if (!salesTemperatureObj[location]) {
          salesTemperatureObj[location] = {};
        }
        salesTemperatureObj[location][currDate] = {
          sales: forecasted_sales_quantity,
        };
      }

      for (const location of locations) {
        const weatherObj = new WeatherService(startDate, endDate, location);
        const weatherData = await weatherObj.getTemperatureForecast();
        for (let weatherDate in weatherData) {
          salesTemperatureObj[location][weatherDate] = {
            ...salesTemperatureObj[location][weatherDate],
            temperature: weatherData[weatherDate],
          };
        }
      }
      return salesTemperatureObj;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}

export { ForecastsService };
