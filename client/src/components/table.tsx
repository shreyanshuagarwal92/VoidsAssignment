import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface ISalesForecast {
  date: string;
  location: string;
  sales: number;
}

interface ITable extends ISalesForecast {
  temperature: string;
  reason?: string;
}

interface ISalesTemperatureObj {
  [location: string]: {
    [date: string]: { temperature: string; sales: number };
  };
}

interface ForecastTableProp {
  location: string | null;
  forecasts: ISalesTemperatureObj | null;
  alertResponse: IAlertResponse | null;
}

interface IAlertResponse {
  alertData: { [location: string]: { [reason: string]: string[] } };
  alertReason: { [key: string]: string };
}

export default function ForecastTables({
  location,
  forecasts,
  alertResponse,
}: ForecastTableProp) {
  const [tableContent, setTableContent] = useState<ITable[]>();

  useEffect(() => {
    async function setForecastData() {
      if (!location || !forecasts) {
        return;
      }
      let data: ITable[] = [];
      const locationAlerts = alertResponse?.alertData[location] ?? {};

      for (const date in forecasts[location]) {
        const forecast = forecasts[location][date];
        const { temperature, sales } = forecast;

        let reason: string = "";
        for (const alertName in locationAlerts) {
          if (locationAlerts[alertName].indexOf(date) > -1) {
            reason += alertResponse?.alertReason[alertName] + "&&&" ?? "";
          }
        }
        data.push({
          date,
          location,
          sales,
          temperature,
          reason,
        });
      }
      setTableContent(data);
    }
    setForecastData();
  }, [forecasts, location, alertResponse]);

  if (!tableContent) {
    return <div>Loading...</div>;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell align="right">City</StyledTableCell>
            <StyledTableCell align="right">
              Forecasted Sales Quantity
            </StyledTableCell>
            <StyledTableCell align="right">Temperature</StyledTableCell>
            {alertResponse && (
              <StyledTableCell align="right">Alert</StyledTableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableContent!.map((row) => (
            <StyledTableRow key={row.date + "_" + row.location}>
              <StyledTableCell component="th" scope="row">
                {row.date}
              </StyledTableCell>
              <StyledTableCell align="right">{row.location}</StyledTableCell>
              <StyledTableCell align="right">{row.sales}</StyledTableCell>
              <StyledTableCell align="right">{row.temperature}</StyledTableCell>
              {alertResponse && (
                <StyledTableCell align="right">
                  {row.reason && row.reason.includes("&&&")
                    ? row.reason
                        .split("&&&")
                        .map((curs, idx) => <p key={idx}>{curs}</p>)
                    : row.reason}
                </StyledTableCell>
              )}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
