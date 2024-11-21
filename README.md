# Currency Calculator

Currency Calculator made with NodeJS &amp; Vue2 , is a web application for converting currencies using real-time exchange rates. The application consists of a backend (API) and a frontend (GUI).

## Prerequisites

To run the app, you'll need the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/get-npm) (comes with Node.js)

## Getting Started

### Clone the repository

First, clone the repository to your local machine:

git clone https://github.com/ariskost/currency_converter.git
cd currency_converter

### Set Up Environment Variables
cp .env.example .env

### Fill in the appropriate values in the .env file. Here's a brief explanation of each variable:

APP_NAME: The name of the application (optional).
PORT: The port where the backend server will run (default is 5000).
JWT_SECRET: A secret key used for generating JWT tokens. Keep this secure.
FRONTEND_URL: The URL for the frontend application (default is http://localhost:8080).
APP_API_BASE_URL: The URL for the backend API (default is http://localhost:5000).

## Install Dependencies
npm run install 
- We are using aliases to make the process easier , npm run install install both backend and gui node_modules

## Running The Application
npm run start
- We are using alias here too , npm run start starts both backend server for API and gui running server 


