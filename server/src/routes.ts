import { Express } from "express";
import { AlertController } from "./controllers/alerts.controller";
import { ForecastsController } from "./controllers/forecasts.controller";

export function routes(app: Express) {
  app.get("/", (req, res) => {
    return res.send("Service is up and running");
  });

  app.post("/alerts", async (req, res) => {
    try {
      const controllerObj = new AlertController();
      const response = await controllerObj.getAllAlert(req.body);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  });

  app.post("/stats", async (req, res) => {
    try {
      const controllerObj = new ForecastsController();
      const response = await controllerObj.getAllSalesAndTemperatureData(
        req.body
      );
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  });
}
