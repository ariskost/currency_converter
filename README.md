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

### Fill in the appropriate values in the .env file.

Make sure to fill in the appropriate values for the following variables:

- **`APP_NAME`**: The name of the application (optional).
- **`PORT`**: The port where the backend server will run (default is 5000).
- **`JWT_SECRET`**: A secret key used for generating JWT tokens. **Keep this secure**.
- **`FRONTEND_URL`**: The URL for the frontend application (default is `http://localhost:8080`).
- **`APP_API_BASE_URL`**: The URL for the backend API (default is `http://localhost:5000`).

## Install Dependencies
npm run install 
This command installs:

- Backend dependencies in the `backend` folder.
- Frontend dependencies in the `gui` folder.

We use aliases in the package.json scripts to streamline the process.

## Running the Application

Run the following command to start both the backend and frontend servers:
npm run start

This will:

- Start the backend server (API) on port `5000`.
- Start the frontend server (GUI) on port `8080`.

The app should now be accessible at [http://localhost:8080](http://localhost:8080).

### Login Credentials 
USERNAME: admin
PASSWORD: password123

---

### Notes

- If you need to update or add new environment variables, you can do so by editing the `.env` file.
- Make sure the `.env` file is secure, especially the `JWT_SECRET`, which should not be shared publicly.

## License

This project is licensed under the **GNU General Public License v3.0** - see the [LICENSE](LICENSE) file for details.


## Acknowledgments

- Built with [Vue.js](https://vuejs.org/) for the frontend.
- Powered by [Node.js](https://nodejs.org/) and [Express](https://expressjs.com/) for the backend.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) used for JWT authentication.
