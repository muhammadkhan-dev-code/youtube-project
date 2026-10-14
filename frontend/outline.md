
# 🎬 VideoTube Backend - Complete Feature Overview & Frontend Guide

## 📦 **DATA MODELS** (7 Models)

### 1. **User Model**
- `username` - unique, indexed
- `email` - unique
- `fullName` - indexed
- `avatar` - required (Cloudinary URL)
- `coverImage` - optional
- `password` - hashed with bcrypt
- `refreshToken` - JWT token
- `watchHistory` - array of video references
- Timestamps: `createdAt`, `updatedAt`

### 2. **Video Model**
- `title` - required
- `description` - required
- `videoFile` - required (Cloudinary URL)
- `thumbnail` - required
- `duration` - number (in seconds)
- `views` - default: 0
- `isPublished` - boolean, default: true
- `owner` - User reference
- `likes` - array of User references
- `comments` - array of Comment references
- Supports pagination (mongoose-aggregate-paginate-v2)

### 3. **Comment Model**
- `content` - required
- `video` - Video reference
- `owner` - User reference
- Supports pagination

### 4. **Like Model**
- `video` - Video reference (optional)
- `comment` - Comment reference (optional)
- `tweet` - Tweet reference (optional)
- `likedBy` - User reference
- *Note: One like can be for either video, comment, or tweet*

### 5. **Playlist Model**
- `name` - required
- `description` - required
- `videos` - array of Video references
- `owner` - User reference

### 6. **Subscription Model**
- `subscriber` - User reference (who subscribes)
- `channel` - User reference (channel being subscribed to)

### 7. **Tweet Model**
- `content` - required
- `owner` - User reference

---

## 🔐 **AUTHENTICATION & AUTHORIZATION**

### Authentication Features:
- JWT-based authentication (Access Token + Refresh Token)
- HTTP-only cookies for security
- Bcrypt password hashing
- Middleware: `verifyJWT` for protected routes

---

## 🛣️ **API ENDPOINTS BREAKDOWN**

### **BASE URL**: `http://localhost:8080`

---

## 👤 **USER ROUTES** (users)

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | `/users/register` | No | Register new user (multipart: avatar, coverImage) |
| POST | `/users/login` | No | Login user (returns tokens) |
| POST | `/users/logout` | Yes | Logout & clear refresh token |
| POST | `/users/refresh-token` | No | Refresh access token |
| POST | `/users/change-password` | Yes | Change user password |
| GET | `/users/current-user` | Yes | Get logged-in user details |
| PATCH | `/users/update-account` | Yes | Update fullName & email |
| PATCH | `/users/avatar` | Yes | Update avatar image |
| PATCH | `/users/cover-image` | Yes | Update cover image |
| GET | `/users/channel/:username` | Yes | Get channel profile with stats |
| GET | `/users/watch-history` | Yes | Get user's watch history |

---

## 🎥 **VIDEO ROUTES** (`/videos`)

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/videos` | Yes | Get all videos (pagination, search, sort) |
| POST | `/videos` | Yes | Upload video (multipart: videoFile, thumbnail) |
| GET | `/videos/:videoId` | Yes | Get video by ID with owner details |
| PATCH | `/videos/:videoId` | Yes | Update video (title, desc, thumbnail) |
| DELETE | `/videos/:videoId` | Yes | Delete video (owner only) |
| PATCH | `/videos/toggle/publish/:videoId` | Yes | Toggle publish status |

**Query Parameters for GET /videos:**
- `page` - page number (default: 1)
- `limit` - items per page (default: 10)
- `query` - search in title/description
- `sortBy` - createdAt, views, title
- `sortType` - asc/desc
- `userId` - filter by owner

---

## 💬 **COMMENT ROUTES** (`/comments`)

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/comments/:videoId` | Yes | Get all comments for a video |
| POST | `/comments/:videoId` | Yes | Add comment to video |
| PATCH | `/comments/:commentId` | Yes | Update comment (owner only) |
| DELETE | `/comments/:commentId` | Yes | Delete comment (owner only) |

---

## ❤️ **LIKE ROUTES** (`/likes`)

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | `/likes/toggle/:videoId` | Yes | Toggle like on video |
| POST | `/likes/toggle/:commentId` | Yes | Toggle like on comment |
| POST | `/likes/toggle/:tweetId` | Yes | Toggle like on tweet |
| GET | `/likes/videos` | Yes | Get all liked videos by user |

---

## 📂 **PLAYLIST ROUTES** (`/playlists`)

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | `/playlists` | Yes | Create new playlist |
| GET | `/playlists/:playlistId` | Yes | Get playlist by ID |
| PATCH | `/playlists/:playlistId` | Yes | Update playlist (owner only) |
| DELETE | `/playlists/:playlistId` | Yes | Delete playlist (owner only) |
| PATCH | `/playlists/add/:videoId/:playlistId` | Yes | Add video to playlist |
| PATCH | `/playlists/remove/:videoId/:playlistId` | Yes | Remove video from playlist |
| GET | `/playlists/user/:userId` | Yes | Get all playlists of a user |

---

## 🔔 **SUBSCRIPTION ROUTES** (`/subscriptions`)

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | `/subscriptions/channel/:channelId` | Yes | Toggle subscription to channel |
| GET | `/subscriptions/channel/:channelId` | Yes | Get subscribed channels |
| GET | `/subscriptions/user/:subscriberId` | Yes | Get channel subscribers |

---

## 🐦 **TWEET ROUTES** (`/tweets`)

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | `/tweets` | Yes | Create new tweet |
| GET | `/tweets/user/:userId` | Yes | Get all tweets by user |
| PATCH | `/tweets/:tweetId` | Yes | Update tweet (owner only) |
| DELETE | `/tweets/:tweetId` | Yes | Delete tweet (owner only) |

---

## 📊 **DASHBOARD ROUTES** (`/dashboard`)

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/dashboard/status` | Yes | Get channel stats (views, subscribers, videos, likes) |
| GET | `/dashboard/videos` | Yes | Get all videos of logged-in user's channel |

---

## 🏥 **HEALTH CHECK** (`/health`)

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/health` | No | Check API health status |

---
Body:
{
  "content": "Your comment text"
}
```

#### 3. Update Comment
```http
PATCH /comments/:commentId
Authorization: Bearer <accessToken>
Content-Type: application/json

Body:
{
  "content": "Updated comment text"
}

Note: Only comment owner can update
```

#### 4. Delete Comment
```http
DELETE /comments/:commentId
Authorization: Bearer <accessToken>

Note: Only comment owner can delete
```

---

## ❤️ **LIKE ROUTES** (`/likes`)

**Note:** All like routes require authentication

#### 1. Toggle Video Like
```http
POST /likes/toggle/:videoId
Authorization: Bearer <accessToken>

Response: Message indicating liked/unliked status
```

#### 2. Toggle Comment Like
```http
POST /likes/toggle/:commentId
Authorization: Bearer <accessToken>

Response: Message indicating liked/unliked status
```

#### 3. Toggle Tweet Like
```http
POST /likes/toggle/:tweetId
Authorization: Bearer <accessToken>

Response: Message indicating liked/unliked status
```

#### 4. Get Liked Videos
```http
GET /likes/videos
Authorization: Bearer <accessToken>

Response: Array of all videos liked by current user
```

---

## 📂 **PLAYLIST ROUTES** (`/playlists`)

**Note:** All playlist routes require authentication

#### 1. Create Playlist
```http
POST /playlists
Authorization: Bearer <accessToken>
Content-Type: application/json

Body:
{
  "name": "My Playlist",
  "description": "Playlist description"
}
```

#### 2. Get Playlist by ID
```http
GET /playlists/:playlistId
Authorization: Bearer <accessToken>

Response: Playlist with populated videos
```

#### 3. Update Playlist
```http
PATCH /playlists/:playlistId
Authorization: Bearer <accessToken>
Content-Type: application/json

Body:
{
  "name": "Updated Name",
  "description": "Updated description"
}

Note: Only playlist owner can update
```

#### 4. Delete Playlist
```http
DELETE /playlists/:playlistId
Authorization: Bearer <accessToken>

Note: Only playlist owner can delete
```

#### 5. Add Video to Playlist
```http
PATCH /playlists/add/:videoId/:playlistId
Authorization: Bearer <accessToken>

Note: Only playlist owner can add videos
```

#### 6. Remove Video from Playlist
```http
PATCH /playlists/remove/:videoId/:playlistId
Authorization: Bearer <accessToken>

Note: Only playlist owner can remove videos
```

#### 7. Get User Playlists
```http
GET /playlists/user/:userId
Authorization: Bearer <accessToken>

Response: Array of all playlists created by the user
```

---

## 🔔 **SUBSCRIPTION ROUTES** (`/subscriptions`)

**Note:** All subscription routes require authentication

#### 1. Toggle Subscription
```http
POST /subscriptions/channel/:channelId
Authorization: Bearer <accessToken>

Response: Message indicating subscribed/unsubscribed status
```

#### 2. Get Subscribed Channels
```http
GET /subscriptions/channel/:channelId
Authorization: Bearer <accessToken>

Response: Array of channels the user is subscribed to
```

#### 3. Get Channel Subscribers
```http
GET /subscriptions/user/:subscriberId
Authorization: Bearer <accessToken>

Response: Array of users subscribed to the channel
```

---

## 🐦 **TWEET ROUTES** (`/tweets`)

**Note:** All tweet routes require authentication

#### 1. Create Tweet
```http
POST /tweets
Authorization: Bearer <accessToken>
Content-Type: application/json

Body:
{
  "content": "Your tweet content"
}
```

#### 2. Get User Tweets
```http
GET /tweets/user/:userId
Authorization: Bearer <accessToken>

Response: Array of all tweets by the user
```

#### 3. Update Tweet
```http
PATCH /tweets/:tweetId
Authorization: Bearer <accessToken>
Content-Type: application/json

Body:
{
  "content": "Updated tweet content"
}

Note: Only tweet owner can update
```

#### 4. Delete Tweet
```http
DELETE /tweets/:tweetId
Authorization: Bearer <accessToken>

Note: Only tweet owner can delete
```

---

## 📊 **DASHBOARD ROUTES** (`/dashboard`)

**Note:** All dashboard routes require authentication

#### 1. Get Channel Stats
```http
GET /dashboard/status
Authorization: Bearer <accessToken>

Response:
{
  "totalVideos": 50,
  "totalViews": 10000,
  "totalSubscribers": 1500,
  "totalLikes": 5000
}
```

#### 2. Get Channel Videos
```http
GET /dashboard/videos
Authorization: Bearer <accessToken>

Response: Array of all videos uploaded by current user
```

---

## 🏥 **HEALTH CHECK** (`/health`)

#### Health Check
```http
GET /health

Response:
{
  "status": "OK",
  "message": "Server is running"
}
```

---

## 🎨 **FRONTEND DEVELOPMENT GUIDE**

### **Recommended Tech Stack**

#### **Framework Options:**
- React.js (Most popular)
- Next.js (SSR + SEO benefits)
- Vue.js
- Angular

#### **State Management:**
- Redux Toolkit (Complex state)
- Zustand (Lightweight)
- TanStack Query / React Query (Server state)
- Context API (Simple state)

#### **UI Libraries:**
- Tailwind CSS (Utility-first)
- Material-UI (Component library)
- Chakra UI (Accessible components)
- Ant Design
- shadcn/ui (Modern components)

#### **HTTP Client:**
- Axios (Interceptors, easy config)
- TanStack Query (Caching, auto-refetch)
- Fetch API (Native)

#### **Video Player:**
- Video.js
- React Player
- Plyr
- JW Player

#### **Form Handling:**
- React Hook Form (Performance)
- Formik (Popular)
- Native form handling

#### **File Upload:**
- React Dropzone
- Filepond
- Custom drag-drop

#### **Routing:**
- React Router v6
- Next.js App Router
- TanStack Router

---

### **Pages & Components Structure**

#### **1. Authentication Pages**

**Register Page** (`/register`)
- Form fields: username, email, fullName, password, confirmPassword
- File upload: avatar (required), coverImage (optional)
- Validation: Email format, password strength, unique username
- Redirect to login after success

**Login Page** (`/login`)
- Form fields: username/email, password
- "Remember me" option
- Forgot password link
- Redirect to home after success

**Components:**
- `AuthForm`
- `ImageUploader`
- `PasswordInput` (with show/hide)

---

#### **2. Home/Feed Page** (`/`)

**Features:**
- Video grid/list view
- Search bar (debounced)
- Sort dropdown (Latest, Most Viewed, Title A-Z)
- Filter options (All, Subscribed, Trending)
- Infinite scroll / Pagination
- Video thumbnails with:
  - Duration badge
  - View count
  - Upload date
  - Channel avatar & name

**Components:**
- `VideoCard`
- `SearchBar`
- `FilterBar`
- `VideoGrid`
- `Pagination`

---

#### **3. Video Player Page** (`/video/:videoId`)

**Layout:**
- Video player (main)
- Video title
- View count, upload date
- Like/Dislike buttons
- Share button
- Save to playlist button
- Channel info with subscribe button
- Video description (expandable)
- Comments section
- Suggested videos sidebar

**Components:**
- `VideoPlayer`
- `VideoInfo`
- `ChannelInfo`
- `SubscribeButton`
- `LikeButton`
- `CommentSection`
- `SuggestedVideos`

---

#### **4. Channel/Profile Pages**

**My Profile** (`/profile`)
- User info (avatar, cover, name, email, username)
- Edit profile button
- My videos tab
- My playlists tab
- Tweets tab
- Statistics (if own channel)

**Public Channel** (`/channel/:username`)
- Channel banner (coverImage)
- Channel avatar
- Channel name & username
- Subscriber count
- Subscribe button
- Tabs: Videos, Playlists, Tweets, About

**Edit Profile** (`/profile/edit`)
- Update fullName, email
- Change avatar
- Change cover image
- Change password (separate section)

**Components:**
- `ProfileHeader`
- `ProfileStats`
- `TabNavigation`
- `EditProfileForm`

---

#### **5. Video Upload Page** (`/upload`)

**Features:**
- Drag-drop video file
- Video preview
- Title input
- Description textarea
- Thumbnail upload (with preview)
- Publish/Draft toggle
- Progress bar for upload
- Cancel upload option

**Components:**
- `VideoUploadForm`
- `FileDropZone`
- `UploadProgress`
- `ThumbnailPreview`
---

