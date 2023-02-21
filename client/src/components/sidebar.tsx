import React, { ChangeEvent, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ForecastTables from "./table";
import { ForecastsService } from "../services/forecast.service";
import { LocationCity } from "@mui/icons-material";
import { AlertService } from "../services/alert.service";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";

const drawerWidth = 240;

const StyledFormGroup = styled(FormGroup)(({ theme }) => ({
  marginLeft: theme.spacing(2),
}));

interface ISalesTemperatureObj {
  [location: string]: {
    [date: string]: { temperature: string; sales: number };
  };
}

interface IAlertResponse {
  alertData: { [location: string]: { [reason: string]: string[] } };
  alertReason: { [key: string]: string };
}

export default function CityDrawer() {
  const [locations, setLocations] = useState<string[] | null>(null);
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);
  const [tableData, setTableData] = useState<ISalesTemperatureObj | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertResponse, setAlertResponse] = useState<IAlertResponse | null>(
    null
  );

  useEffect(() => {
    async function setLocationsData() {
      setTableData({});
      const forecasts: ISalesTemperatureObj =
        await ForecastsService.fetchForecasts();

      if (showAlert) {
        const alerts: IAlertResponse = await AlertService.fetchAlerts();
        if (alerts) setAlertResponse(alerts);
      } else {
        setAlertResponse(null);
      }

      if (forecasts) {
        const locations: string[] = Object.keys(forecasts);
        setLocations(locations);
        setCurrentLocation(locations[0]);
        setTableData(forecasts);
      }
    }
    setLocationsData();
  }, [showAlert]);

  const handleListItemClick = (item: string) => {
    setCurrentLocation(item);
  };

  const handleAlertClick = (
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setShowAlert(checked);
  };

  if (!locations) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        enableColorOnDark
        color="default"
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Sales Forecasts Dashboard
          </Typography>
          <StyledFormGroup>
            <FormControlLabel
              control={
                <Switch checked={showAlert} onChange={handleAlertClick} />
              }
              label="Alerts"
            />
          </StyledFormGroup>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {locations.map((text, index) => (
              <ListItem
                key={text}
                disablePadding
                selected={text === currentLocation}
              >
                <ListItemButton onClick={() => handleListItemClick(text)}>
                  <ListItemIcon>
                    <LocationCity />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <ForecastTables
          location={currentLocation}
          forecasts={tableData}
          alertResponse={alertResponse}
        />
      </Box>
    </Box>
  );
}
