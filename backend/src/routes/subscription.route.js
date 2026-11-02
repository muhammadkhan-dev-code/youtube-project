import { Router } from "express";
import {
  getSubscribedChannels,
  getUserChannelSubscribers,
  toggleSubscription,
} from "../controllers/subscription.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyJWT);

// Get channel subscribers (who subscribed to channel) & toggle subscription
router
  .route("/channel/:channelId")
  .get(getUserChannelSubscribers)
  .post(toggleSubscription);

router
  .route("/c/:channelId")
  .get(getUserChannelSubscribers)
  .post(toggleSubscription);

// Get channels subscribed to by user
router.route("/user/:subscriberId").get(getSubscribedChannels);
router.route("/u/:subscriberId").get(getSubscribedChannels);

export default router;