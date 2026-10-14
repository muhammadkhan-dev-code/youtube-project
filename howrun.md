# Project Setup and Run Guide (Frontend & Backend)

A complete guide to set up, configure, and run the **MyTube** (YouTube Clone) application locally.

---

## 📋 Table of Contents
1. [Prerequisites](#-prerequisites)
2. [Project Architecture Overview](#-project-architecture-overview)
3. [Backend Setup (Express & MongoDB)](#-backend-setup-express--mongodb)
4. [Frontend Setup (React + Vite)](#-frontend-setup-react--vite)
5. [Running Both Services Together](#-running-both-services-together)
6. [Available Routes & Features](#-available-routes--features)
7. [Troubleshooting & Common Issues](#-troubleshooting--common-issues)

---

## 🛠 Prerequisites

Before starting, ensure you have the following installed on your machine:
- **Node.js**: v18.0.0 or higher ([Download Node.js](https://nodejs.org/))
- **npm**: v9.0.0 or higher (bundled with Node.js)
- **MongoDB**: 
  - Local MongoDB Community Server running on `mongodb://127.0.0.1:27017` ([Download MongoDB](https://www.mongodb.com/try/download/community)), OR
  - A MongoDB Atlas cloud connection string.

---

## 🏗 Project Architecture Overview

```
youtube-project/
├── backend/            # Express REST API, MongoDB/Mongoose, JWT auth, Multer
│   ├── src/
│   ├── public/temp/    # Upload storage for avatars & media
│   ├── .env            # Backend environment variables
│   └── package.json
├── frontend/           # React 18, Vite, TailwindCSS, Redux Toolkit, React Router
│   ├── src/
│   ├── .env            # Frontend environment variables
│   └── package.json
└── howrun.md           # This setup manual
```

---

## ⚙️ Backend Setup (Express & MongoDB)

### 1. Open a terminal and navigate to `backend`:
```powershell
cd backend
```

### 2. Install dependencies:
```powershell
npm install
```

### 3. Configure the `.env` file:
Ensure your `backend/.env` file contains the following configurations:

```env
PORT=8000
MONGODB_URL=mongodb://127.0.0.1:27017
CORS_ORIGIN=http://localhost:5173
ACCESS_TOKEN_SECRET=youtube_project_access_token_secret_key_2026_super_secure_random_string
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=youtube_project_refresh_token_secret_key_2026_super_secure_random_string
REFRESH_TOKEN_EXPIRY=10d
NODE_ENV=development

# Optional: Cloudinary CDN credentials (if empty/default, media is automatically stored locally)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

> **Note on Media Uploads**: If you haven't configured Cloudinary, the backend automatically uses a local fallback and stores avatars and videos inside `backend/public/temp/`.

### 4. Start the backend development server:
```powershell
npm run dev
```

The server will start using `nodemon`:
```
Server is running on port 8000
MONGO DB CONNECTED SUCCESSFULLY !!
```

---

## 💻 Frontend Setup (React + Vite)

### 1. Open a new (second) terminal and navigate to `frontend`:
```powershell
cd frontend
```

### 2. Install dependencies:
```powershell
npm install
```

### 3. Configure the `.env` file:
Ensure your `frontend/.env` file contains:

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_USER_baseURL=http://localhost:8000/users
VITE_API_URL=http://localhost:8000/api/v1

# YouTube Data API v3 Key (for fetching real YouTube videos on HomePage)
VITE_YOUTUBE_API_KEY=AIzaSyBEKqs26vTYXf5qhnHI009JeWjkx9mym9Y
VITE_API_KEY=AIzaSyBEKqs26vTYXf5qhnHI009JeWjkx9mym9Y
```

### 4. Start the Vite development server:
```powershell
npm run dev
```

You should see:
```
  VITE v6.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Open your browser and navigate to **[http://localhost:5173](http://localhost:5173)**.

---

## 🚀 Running Both Services Together

Always keep two separate terminal windows open:

| Service | Port | Directory | Command |
| :--- | :--- | :--- | :--- |
| **Backend API** | `http://localhost:8000` | `cd backend` | `npm run dev` |
| **Frontend UI** | `http://localhost:5173` | `cd frontend` | `npm run dev` |

---

## 🧭 Available Routes & Features

| Path | Description | Access |
| :--- | :--- | :--- |
| `/` | Home page (YouTube feed with search, category filtering & video popup player) | Public |
| `/users/register` or `/register` | User Registration (Full Name, Username, Email, Password, Avatar, Cover Image) | Public |
| `/users/login` or `/login` | User Login (Email/Username + Password) | Public |
| `/video/:videoId` | Dedicated video watch page with comments and like system | Public |
| `/upload` | Video upload page (Title, description, video file, thumbnail) | Authenticated |
| `/dashboard` | Channel dashboard with channel statistics and uploaded video manager | Authenticated |
| `/tweets` | Community posts and tweet feeds | Authenticated |
| `/users/profile` | User channel profile details | Authenticated |
| `/users/edit-profile` | Update account details (Name, Email, Avatar) | Authenticated |

---

## 🔍 Troubleshooting & Common Issues

### 1. `MONGO DB CONNECTION ERROR`
- **Cause**: MongoDB service is not running locally.
- **Fix**: 
  - Windows: Open Services (`services.msc`), find **MongoDB Server**, and click **Start**.
  - Or run `net start MongoDB` in an Administrator Command Prompt.
  - If using MongoDB Atlas, update `MONGODB_URL` in `backend/.env` with your connection string.

### 2. `[401] Invalid user password` or `User not found`
- **Cause**: Attempting to sign in with an account that has not been registered yet or typing the wrong password.
- **Fix**: Navigate to `/users/register`, create a new account with an avatar image, and then sign in.

### 3. `Error in uploading avatar image`
- **Cause**: Cloudinary credentials invalid or missing.
- **Fix**: The backend now includes an automatic local storage fallback (`public/temp`). Ensure `backend/public/temp/` exists.

### 4. `Failed to fetch data from YouTube API`
- **Cause**: Incorrect YouTube API URL or missing API key.
- **Fix**: Ensure `VITE_YOUTUBE_API_KEY` is present in `frontend/.env`. The application also includes built-in fallback videos if the quota limit is reached.
