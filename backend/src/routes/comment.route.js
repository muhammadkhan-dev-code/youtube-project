import { Router } from "express";
import {
  addComment,
  deleteComment,
  getVideoComments,
  updateComment,
} from "../controllers/comment.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyJWT);

// video comments
router.route("/:videoId").get(getVideoComments).post(addComment);

// individual comment operations (supports both /c/:commentId and /:commentId, plus patch and put)
router
  .route("/c/:commentId")
  .delete(deleteComment)
  .patch(updateComment)
  .put(updateComment);

router
  .route("/:commentId")
  .delete(deleteComment)
  .patch(updateComment)
  .put(updateComment);

export default router;
