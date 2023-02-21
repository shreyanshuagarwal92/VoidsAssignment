import HTTPStatusCodes from "../utils/statusCode.util";
import { IForecastsDateRange } from "../interfaces/forecasts.interface";
import { ForecastsService } from "../services/forecasts.service";

class ForecastsController {
  getAllSalesAndTemperatureData = async (data: IForecastsDateRange) => {
    try {
      return {
        statusCode: HTTPStatusCodes.success.OK,
        message: await ForecastsService.getSalesAndTemperature(data),
      };
    } catch (error) {
      return {
        statusCode: HTTPStatusCodes.clientError.BAD_REQUEST,
        message: error.message,
      };
    }
  };
}

export { ForecastsController };
