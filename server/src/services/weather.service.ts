//https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/aachen/2023-02-19/2023-03-01?unitGroup=metric&key=3WWEVYKLNRDJ4DHHK7ASL5XFF&contentType=json
import axios from "axios";

class WeatherService {
  private startDate;
  private endDate;
  private location;

  constructor(startDate: string, endDate: string, location: string) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.location = location;
  }
  getTemperatureForecast = async (): Promise<{ [key: string]: number }> => {
    try {
      const apiResponse = await this.weatherForDatesAndLocation();
      const response: { [key: string]: number } = {};
      apiResponse.days.forEach((obj: { datetime: string; temp: number }) => {
        const { datetime, temp } = obj;
        response[datetime] = temp;
      });
      return response;
    } catch (error) {
      throw new Error(`Unable to get weather: ${error.message}`);
    }
  };

  weatherForDatesAndLocation = async (): Promise<any> => {
    const hostname =
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

    const path =
      this.location +
      "/" +
      this.startDate +
      "/" +
      this.endDate +
      "?unitGroup=metric&key=" +
      process.env.WEATHER_API_KEY +
      "&contentType=json";
    try {
      const response = await axios.get(hostname + path);
      return response.data;
    } catch (error) {
      throw new Error(`Unable to get weather: ${error.message}`);
    }
  };
}

export { WeatherService };
