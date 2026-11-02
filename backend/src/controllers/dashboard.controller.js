import mongoose from "mongoose";
import { Video } from "../models/video.model.js";
import { Subscription } from "../models/subscription.model.js";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getChannelStats = asyncHandler(async (req, res) => {
  const channelId = req.user && req.user._id;

  if (!channelId || !mongoose.isValidObjectId(channelId)) {
    throw new ApiError(404, "Channel not found");
  }

  const videos = await Video.find({ owner: channelId });
  const totalVideos = videos.length;
  const totalViews = videos.reduce((acc, video) => {
    return acc + (video.views || 0);
  }, 0);
  const videoIds = videos.map((video) => video._id);

  let totalLikes = 0;
  if (videoIds.length > 0) {
    totalLikes = await Like.countDocuments({
      video: { $in: videoIds },
    });
  }

  const totalSubscribers = await Subscription.countDocuments({
    channel: channelId,
  });

  const res_data = {
    totalVideos,
    totalViews,
    totalLikes,
    totalSubscribers,
  };

  return res
    .status(200)
    .json(new ApiResponse(200, "Channel stats fetched successfully", res_data));
});

const getChannelVideos = asyncHandler(async (req, res) => {
  const channelId = req.user && req.user._id;

  if (!channelId || !mongoose.isValidObjectId(channelId)) {
    throw new ApiError(404, "Channel not found");
  }

  const [videos, total] = await Promise.all([
    Video.find({ owner: channelId })
      .populate("owner", "username fullName avatar")
      .sort({ createdAt: -1 })
      .lean(),
    Video.countDocuments({ owner: channelId }),
  ]);

  const channel_info = { videos, total };

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Channel videos fetched successfully", channel_info)
    );
});

export { getChannelStats, getChannelVideos };
