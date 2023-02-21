import { ForecastsController } from "../../controllers/forecasts.controller";
import { ForecastsService } from "../../services/forecasts.service";

jest.mock("../../services/forecasts.service");

describe("Forecasts Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllSalesAndTemperatureData", () => {
    it("should return sales and temperature data", async () => {
      const data = {
        startDate: "2022-02-01",
        endDate: "2022-02-02",
      };

      const expectedResponse = {
        statusCode: 200,
        message: {
          "Location A": {
            "2022-02-01": { sales: 100, temperature: 10 },
            "2022-02-02": { sales: 200, temperature: 12 },
          },
          "Location B": {
            "2022-02-01": { sales: 50, temperature: 8 },
            "2022-02-02": { sales: 100, temperature: 10 },
          },
        },
      };

      const getSalesAndTemperatureMock = jest.spyOn(
        ForecastsService,
        "getSalesAndTemperature"
      );

      getSalesAndTemperatureMock.mockResolvedValueOnce(
        expectedResponse.message
      );

      const forecastsController = new ForecastsController();
      const response = await forecastsController.getAllSalesAndTemperatureData(
        data
      );

      expect(getSalesAndTemperatureMock).toHaveBeenCalledTimes(1);
      expect(getSalesAndTemperatureMock).toHaveBeenCalledWith(data);

      expect(response).toEqual(expectedResponse);
    });

    it("should handle errors and return 400 status code", async () => {
      const data = {
        startDate: "2022-02-01",
        endDate: "2022-02-02",
      };

      const errorMessage = "An error occurred";

      const getSalesAndTemperatureMock = jest.spyOn(
        ForecastsService,
        "getSalesAndTemperature"
      );

      getSalesAndTemperatureMock.mockRejectedValueOnce(new Error(errorMessage));

      const forecastsController = new ForecastsController();
      const response = await forecastsController.getAllSalesAndTemperatureData(
        data
      );

      expect(getSalesAndTemperatureMock).toHaveBeenCalledTimes(1);
      expect(getSalesAndTemperatureMock).toHaveBeenCalledWith(data);

      expect(response).toEqual({
        statusCode: 400,
        message: errorMessage,
      });
    });
  });
});
