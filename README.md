# Voids Assignment

## Description

This assignment consists of two sub-projects: a client for the frontend and a server for the backend.
Client is using React and Material UI.
Server is running on node.js and typescript.

The project was developed with a focus on development and is not yet ready for production. The server pings the weather API to get weather information, which are then matched against data from sales forecast to provide the backend API.

## Getting Started

- run `docker-compose up -d` to start the servers inside docker containers
- run `docker-compose down --rmi all -v --remove-orphans` to start the stop inside docker containers
- Environment Variables are declared in docker-compose file.

## Approach to project

- Get all the data from Weather API
- Get all the data from postgres database.
- Write an API to get the combined data of temperature and sales forecast.
- Write Alert logic and an API to send that data to frontend
