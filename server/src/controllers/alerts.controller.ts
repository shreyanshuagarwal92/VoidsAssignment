import { IForecastsDateRange } from "../interfaces/forecasts.interface";
import HTTPStatusCodes from "../utils/statusCode.util";
import moment from "moment";
import { ISalesTemperatureObj } from "../interfaces/alert.interface";
import { ALERTS, ALERT_REASON } from "../constants";
import { ForecastsService } from "../services/forecasts.service";

class AlertController {
  async getAllAlert(data: IForecastsDateRange) {
    try {
      const salesTemperatureObj = await ForecastsService.getSalesAndTemperature(
        data
      );
      const alerts = this.checkForAlerts(salesTemperatureObj);
      return {
        statusCode: HTTPStatusCodes.success.OK,
        message: alerts,
      };
    } catch (error) {
      return {
        statusCode: HTTPStatusCodes.clientError.BAD_REQUEST,
        message: error.message,
      };
    }
  }

  checkForAlerts(data: ISalesTemperatureObj) {
    const alerts: { date: string; reason: string; location: string }[] = [];

    for (const location in data) {
      const salesQuantities: number[] = [];
      const temperatures: number[] = [];

      for (const date in data[location]) {
        const { sales, temperature } = data[location][date];

        if (sales !== undefined) {
          this.checkForLowSales(date, location, sales, salesQuantities, alerts);
        }

        if (temperature !== undefined) {
          this.checkForLowTemperature(
            date,
            location,
            temperature,
            salesQuantities,
            temperatures,
            alerts
          );
        }
      }
    }

    const response = this.groupAlertsByLocationAndReason(alerts);
    return { alertData: response, alertReason: ALERT_REASON };
  }

  private checkForLowSales(
    date: string,
    location: string,
    sales: number,
    salesQuantities: number[],
    alerts: { date: string; reason: string; location: string }[]
  ) {
    salesQuantities.push(sales);

    if (salesQuantities.length > 3) {
      salesQuantities.shift();
    }

    if (
      salesQuantities.length === 3 &&
      salesQuantities.reduce((sum, x) => sum + x, 0) < 1000
    ) {
      alerts.push(this.createAlertObj(date, ALERTS.lowSales, location));
    }
  }

  private checkForLowTemperature(
    date: string,
    location: string,
    temperature: number,
    salesQuantities: number[],
    temperatures: number[],
    alerts: { date: string; reason: string; location: string }[]
  ) {
    temperatures.push(temperature);

    if (temperatures.length > 3) {
      temperatures.shift();
    }

    if (
      temperatures.length === 3 &&
      temperatures.every((t) => t < 5) &&
      (salesQuantities.length !== 3 ||
        salesQuantities.reduce((sum, x) => sum + x, 0) < 1500)
    ) {
      alerts.push(this.createAlertObj(date, ALERTS.lowTemperature, location));
    }
  }

  private createAlertObj(date: string, reason: string, location: string) {
    const dateToProcess = new Date(date);
    return {
      date: moment(dateToProcess).subtract(2, "days").format("YYYY-MM-DD"),
      reason,
      location,
    };
  }

  private groupAlertsByLocationAndReason(
    alerts: { date: string; reason: string; location: string }[]
  ) {
    const response: { [location: string]: { [reason: string]: string[] } } = {};
    for (const alert of alerts) {
      if (!response[alert.location]) {
        response[alert.location] = {};
      }
      if (!response[alert.location][alert.reason]) {
        response[alert.location][alert.reason] = [];
      }
      response[alert.location][alert.reason].push(alert.date);
    }
    return response;
  }
}

export { AlertController };
