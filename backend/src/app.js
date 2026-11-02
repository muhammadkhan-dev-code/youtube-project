import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalError from "./middlewares/globalError.middleware.js";

// routes
import userRouter from "./routes/user.route.js";
import videoRouter from "./routes/video.route.js";
import commentRouter from "./routes/comment.route.js";
import likeRouter from "./routes/like.route.js";
import playlistRouter from "./routes/playlist.route.js";
import dashboardRouter from "./routes/dashboard.route.js";
import subscribeptionRouter from "./routes/subscription.route.js";
import healthrouter from "./routes/healthcheck.route.js";
import tweetRouter from "./routes/tweet.route.js";

const app = express();

const allowedOrigins = [
  process.env.CORS_ORIGIN,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== "production") {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "16kb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

app.use(express.static("public"));
app.use(cookieParser());

// Direct routes
app.use("/users", userRouter);
app.use("/videos", videoRouter);
app.use("/comments", commentRouter);
app.use("/likes", likeRouter);
app.use("/playlists", playlistRouter);
app.use("/dashboard", dashboardRouter);
app.use("/subscriptions", subscribeptionRouter);
app.use("/tweets", tweetRouter);
app.use("/health", healthrouter);

// Also support /api/v1 prefixes for full frontend compatibility
app.use("/api/v1/users", userRouter);
app.use("/api/v1/videos", videoRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/likes", likeRouter);
app.use("/api/v1/playlists", playlistRouter);
app.use("/api/v1/dashboard", dashboardRouter);
app.use("/api/v1/subscriptions", subscribeptionRouter);
app.use("/api/v1/tweets", tweetRouter);
app.use("/api/v1/health", healthrouter);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// global error handler
app.use(globalError);

export { app };
