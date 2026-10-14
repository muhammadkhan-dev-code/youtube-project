import { Router } from "express";
import {
  getLikedVideos,
  toggleCommentLike,
  toggleVideoLike,
  toggleTweetLike,
} from "../controllers/like.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyJWT);

router.route("/videos").get(getLikedVideos);

// Support both /v/:id, /video/:id and /toggle/:id
router.route("/toggle/v/:videoId").post(toggleVideoLike);
router.route("/toggle/video/:videoId").post(toggleVideoLike);

router.route("/toggle/c/:commentId").post(toggleCommentLike);
router.route("/toggle/comment/:commentId").post(toggleCommentLike);

router.route("/toggle/t/:tweetId").post(toggleTweetLike);
router.route("/toggle/tweet/:tweetId").post(toggleTweetLike);

router.route("/toggle/:videoId").post(toggleVideoLike);

export default router;