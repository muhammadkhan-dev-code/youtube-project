import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { Subscription } from "../models/subscription.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleSubscription = asyncHandler(async (req, res) => {
  const channelId = req.params.channelId || req.params.subscriberId;
  const subscriberId = req.user && req.user._id;

  if (!channelId || !mongoose.isValidObjectId(channelId)) {
    throw new ApiError(400, "Invalid channelId");
  }
  if (!subscriberId || !mongoose.isValidObjectId(subscriberId)) {
    throw new ApiError(400, "Invalid subscriberId");
  }

  if (channelId.toString() === subscriberId.toString()) {
    throw new ApiError(400, "You cannot subscribe to yourself");
  }

  const channelUser = await User.findById(channelId).lean();
  if (!channelUser) {
    throw new ApiError(404, "Channel Not Found");
  }

  const existing = await Subscription.findOne({
    channel: channelId,
    subscriber: subscriberId,
  });

  if (existing) {
    await Subscription.findByIdAndDelete(existing._id);
    return res
      .status(200)
      .json(new ApiResponse(200, "Unsubscribed successfully", null));
  }

  const newSub = await Subscription.create({
    channel: channelId,
    subscriber: subscriberId,
  });

  if (!newSub) {
    throw new ApiError(500, "Failed to create subscription");
  }

  const payload = await Subscription.findById(newSub._id).populate(
    "subscriber",
    "username fullName avatar"
  );

  return res
    .status(200)
    .json(new ApiResponse(200, "Subscription toggled successfully", payload));
});

const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  const channelId = req.params.channelId || req.params.subscriberId;
  if (!channelId || !mongoose.isValidObjectId(channelId)) {
    throw new ApiError(400, "Invalid channelId");
  }

  const subscribers = await Subscription.find({
    channel: channelId,
  })
    .populate("subscriber", "username fullName avatar")
    .lean();

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Subscribers fetched successfully", subscribers)
    );
});

const getSubscribedChannels = asyncHandler(async (req, res) => {
  const subscriberId = req.params.subscriberId || req.params.channelId;
  if (!subscriberId || !mongoose.isValidObjectId(subscriberId)) {
    throw new ApiError(400, "Invalid subscriberId");
  }

  const subs = await Subscription.find({
    subscriber: subscriberId,
  })
    .populate({
      path: "channel",
      select: "username fullName avatar",
    })
    .lean();

  const channels = (subs || []).map((s) => s.channel).filter(Boolean);

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Subscribed channels fetched successfully", {
        total: channels.length,
        channels,
      })
    );
});

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };
