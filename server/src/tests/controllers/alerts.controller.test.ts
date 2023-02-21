import { AlertController } from "../../controllers/alerts.controller";

jest.mock("../../services/forecasts.service");

describe("AlertController", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("checkForAlerts", () => {
    it("should return alert data", async () => {
      const SalesTemperatureObj = {
        Hamburg: {
          "2023-02-21": { sales: 809.1876504180091, temperature: 8.2 },
          "2023-02-22": { sales: 514.2094513349609, temperature: 8.8 },
          "2023-02-23": { sales: 743.21407402423, temperature: 6.2 },
          "2023-02-24": { sales: 972.2292587040128, temperature: 3.2 },
          "2023-02-25": { sales: 554.1756598979415, temperature: 1.6 },
          "2023-02-26": { sales: 513.021640038112, temperature: 0.7 },
          "2023-02-27": { sales: 968.3490675014075, temperature: 1.6 },
          "2023-02-28": { sales: 288.75198637246626, temperature: 3.1 },
          "2023-03-01": { sales: 368.9398160354024, temperature: 4.1 },
          "2023-03-02": { sales: 993.1155704662884, temperature: 3.5 },
          "2023-03-03": { sales: 829.0484234644648, temperature: 1.7 },
          "2023-03-04": { sales: 414.27365010861274, temperature: 1.1 },
          "2023-03-05": { sales: 838.0225853194657, temperature: 0.9 },
          "2023-03-06": { sales: 254.32432680429727, temperature: 1 },
          "2023-03-07": { sales: 827.1596343598096, temperature: 4.4 },
        },
        Munich: {
          "2023-02-21": { sales: 331.84683289446826, temperature: 7.6 },
          "2023-02-22": { sales: 967.8404370928107, temperature: 7.2 },
          "2023-02-23": { sales: 92.6563816321706, temperature: 7.3 },
          "2023-02-24": { sales: 336.5533072072627, temperature: 6.4 },
          "2023-02-25": { sales: 923.4895753079016, temperature: 0.4 },
          "2023-02-26": { sales: 601.2057691638055, temperature: -1.9 },
          "2023-02-27": { sales: 6.565130487547144, temperature: -2.4 },
          "2023-02-28": { sales: 488.51819805456, temperature: -2.3 },
          "2023-03-01": { sales: 481.4675354891343, temperature: -0.5 },
          "2023-03-02": { sales: 201.9421516919725, temperature: 1.6 },
          "2023-03-03": { sales: 687.8806522779204, temperature: -0.2 },
          "2023-03-04": { sales: 907.5822615508505, temperature: -0.7 },
          "2023-03-05": { sales: 477.62807101077055, temperature: -0.5 },
          "2023-03-06": { sales: 640.9222016696282, temperature: -0.6 },
          "2023-03-07": { sales: 564.0938268954461, temperature: 0.4 },
        },
      };
      const alertResponse = {
        alertData: {
          Munich: {
            lowTemperature: [
              "2023-02-26",
              "2023-02-27",
              "2023-02-28",
              "2023-03-01",
            ],
            lowSales: ["2023-02-27"],
          },
        },
        alertReason: {
          lowTemperature: "Low Temperature for 3 subsequent days",
          lowSales: "Low Sales for 3 subsequent days",
        },
      };
      const alertObj = new AlertController();
      const response = alertObj.checkForAlerts(SalesTemperatureObj);
      expect(response).toEqual(alertResponse);
    });
  });
});
