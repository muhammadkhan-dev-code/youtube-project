import mongoose from "mongoose";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  if (!videoId || !mongoose.isValidObjectId(videoId)) {
    throw new ApiError(400, "VideoId is not found or invalid");
  }

  const isVideoLiked = await Like.findOne({
    video: videoId,
    $or: [{ owner: req.user._id }, { likedBy: req.user._id }],
  });

  if (!isVideoLiked) {
    const newLike = await Like.create({
      video: videoId,
      owner: req.user._id,
      likedBy: req.user._id,
    });
    return res.status(200).json(new ApiResponse(200, "Video liked", newLike));
  } else {
    await Like.findByIdAndDelete(isVideoLiked._id);
    return res.status(200).json(new ApiResponse(200, "Video unliked", null));
  }
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  if (!commentId || !mongoose.isValidObjectId(commentId)) {
    throw new ApiError(400, "CommentId is not found or invalid");
  }

  const isCommentLiked = await Like.findOne({
    comment: commentId,
    $or: [{ owner: req.user._id }, { likedBy: req.user._id }],
  });

  if (!isCommentLiked) {
    const newLike = await Like.create({
      comment: commentId,
      owner: req.user._id,
      likedBy: req.user._id,
    });
    return res.status(200).json(new ApiResponse(200, "Comment liked", newLike));
  } else {
    await Like.findByIdAndDelete(isCommentLiked._id);
    return res.status(200).json(new ApiResponse(200, "Comment unliked", null));
  }
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  if (!tweetId || !mongoose.isValidObjectId(tweetId)) {
    throw new ApiError(400, "TweetId is not found or invalid");
  }

  const isTweetLiked = await Like.findOne({
    tweet: tweetId,
    $or: [{ owner: req.user._id }, { likedBy: req.user._id }],
  });

  if (!isTweetLiked) {
    const likeTweet = await Like.create({
      tweet: tweetId,
      owner: req.user._id,
      likedBy: req.user._id,
    });
    return res.status(200).json(new ApiResponse(200, "Tweet liked", likeTweet));
  } else {
    await Like.findByIdAndDelete(isTweetLiked._id);
    return res.status(200).json(new ApiResponse(200, "Tweet unliked", null));
  }
});

const getLikedVideos = asyncHandler(async (req, res) => {
  const ownerId = req.user && req.user._id;
  if (!ownerId) {
    throw new ApiError(401, "Unauthorized user");
  }

  const likedVideo = await Like.find({
    $or: [{ owner: ownerId }, { likedBy: ownerId }],
    video: { $exists: true, $ne: null },
  }).populate({
    path: "video",
    populate: {
      path: "owner",
      select: "username fullName avatar",
    },
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Liked videos fetched successfully", likedVideo)
    );
});

export { toggleCommentLike, toggleTweetLike, toggleVideoLike, getLikedVideos };
