import axios from "axios";
import moment from "moment";

class ForecastsService {
  static fetchForecasts = async () => {
    try {
      const startDate = moment().format("YYYY-MM-DD");
      const endDate = moment().add(2, "weeks").format("YYYY-MM-DD");

      let data = {
        startDate,
        endDate,
      };

      let config = {
        method: "post",
        url: "/api/stats",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios(config);
      return response.data.message;
    } catch (error) {
      throw error;
    }
  };
}

export { ForecastsService };
