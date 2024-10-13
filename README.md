# Frontend Project with React

## Description

This project is a front-end application built with React that provides user authentication features such as registration, login, password reset, and OTP verification. It also includes Dockerization for running the application in a containerized environment.

## Features

- **User Registration**: Users can register by providing their name, email, password, and other necessary information.
- **Login**: Registered users can log in with their email and password.
- **Password Reset**: Allows users to reset their password if forgotten.
- **OTP Verification**: Supports OTP verification for added security.
- **User Dashboard**: Provides a dashboard for authenticated users.
- **Logout**: Users can log out, which clears the stored JWT token.

## Technologies Used

- **React**: For building the user interface using reusable components.
- **React Router**: For managing routes and navigation in the React application.
- **Axios**: For making HTTP requests to the backend API.
- **Docker**: For containerizing the application.
- **Docker Compose**: For orchestrating multi-container applications.

## Prerequisites

- **Node.js** and **npm** installed on your system.
- **Docker** and **Docker Compose** installed for containerization.

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <project-directory>
2. Install dependencies:
   ```bash
   npm install

## Running the Application
1. **Start the development server **:
    ```bash
    npm start
2.    **Access the application **:

    Open your browser and go to http://localhost:5173.

## Running the Application
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Register.js
│   │   ├── Login.js
│   │   ├── ForgetPassword.js
│   │   ├── ResetPassword.js
│   │   ├── Dashboard.js
│   │   └── VerifyOtp.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── ...
├── .env
├── Dockerfile
├── docker-compose.yml
└── package.json

## Libraries and Frameworks Required

React: For building the UI.
React Router: For managing routes and navigation.
Axios: For making HTTP requests.