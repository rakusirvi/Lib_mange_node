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

rakeshchoudhary@RakeshChoudharys-MacBook-Air Lib_mange_node % git add .
rakeshchoudhary@RakeshChoudharys-MacBook-Air Lib_mange_node % git status
On branch main
Your branch is up to date with 'origin/main'.

Changes to be committed:
(use "git restore --staged <file>..." to unstage)
modified: README.md

rakeshchoudhary@RakeshChoudharys-MacBook-Air Lib_mange_node % git commit -m "initial Commit"
[main 02bd8b7] initial Commit
1 file changed, 77 insertions(+), 2 deletions(-)
rakeshchoudhary@RakeshChoudharys-MacBook-Air Lib_mange_node % git push
Enumerating objects: 5, done.
Counting objects: 100% (5/5), done.
Delta compression using up to 10 threads
Compressing objects: 100% (2/2), done.
Writing objects: 100% (3/3), 1.15 KiB | 1.15 MiB/s, done.
Total 3 (delta 0), reused 0 (delta 0), pack-reused 0 (from 0)
To https://github.com/rakusirvi/Lib_mange_node.git
34dc3e1..02bd8b7 main -> main
rakeshchoudhary@RakeshChoudharys-MacBook-Air Lib_mange_node %

- History restored

Hello this is rakesh
