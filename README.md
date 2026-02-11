# Library Management System

A comprehensive library management system built with React and Node.js. This application allows librarians to manage books, members, and issue/return transactions efficiently.

## Features

- **Book Management**: Add, edit, delete, and search books.
- **Member Management**: Register and manage library members.
- **Issue & Return**: Track book issuances and returns with due date tracking.
- **User Authentication**: Secure login for librarians.
- **Responsive Design**: Works seamlessly on desktop and mobile devices.

## Tech Stack

### Frontend

- **React**: UI library for building the user interface.
- **Vite**: Fast build tool and development server.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **React Router**: For client-side routing.
- **Axios**: For making HTTP requests to the backend.

### Backend

- **Node.js**: JavaScript runtime for the server.
- **Express.js**: Web framework for building the API.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: ODM for MongoDB.
- **JWT (JSON Web Tokens)**: For authentication.
- **Bcrypt**: For password hashing.

## Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (running locally or a MongoDB Atlas connection string)
- **npm** (usually comes with Node.js)

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd Lib_mange_node
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the `backend` directory with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the server:

```bash
npm start
```

The server will start on `http://localhost:5000`.

### 3. Frontend Setup
