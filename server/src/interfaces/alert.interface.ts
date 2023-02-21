export interface ISalesTemperatureObj {
  [location: string]: {
    [date: string]: { temperature?: number; sales?: number };
  };
}
