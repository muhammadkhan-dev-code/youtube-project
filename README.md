# Project Setup 

A complete guide to set up, configure, and run the **Personal**  application locally.


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
ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=
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
VITE_YOUTUBE_API_KEY=
VITE_API_KEY=
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

is reached.
