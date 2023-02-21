# Project Title

Forecasts and Alerts API

## Description

This application acts as a backend for a project. It provides REST API endpoints to perform GET operations on the postgress database and retrieve data from an external API.

## API Reference

Api will be running on `https://localhost:5000`

#### Get all alerts of sales forecasts and temperature for given dates.

`  GET /alerts/`

```
curl --location --request POST 'http://localhost:5000/alerts' \
--header 'Content-Type: application/json' \
--data-raw '{
    "startDate":"2023-02-01",
    "endDate":"2023-02-28"
}'
```

#### Get all stats of sales forecasts and temperature for given dates.

`  GET /stats/`

```
curl --location --request POST 'http://localhost:5000/stats' \
--header 'Content-Type: application/json' \
--data-raw '{
    "startDate":"2023-01-22",
    "endDate":"2023-01-30",
}'
```

## Running Tests

To run tests, run the following command

```bash
  npm run test
```

## Test Coverage

```bash
  npm run coverage
```
