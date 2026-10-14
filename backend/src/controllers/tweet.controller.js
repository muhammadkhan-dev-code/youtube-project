import mongoose, { isValidObjectId } from "mongoose";
import { Tweet } from "../models/tweet.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTweet = asyncHandler(async (req, res) => {
  const { content } = req.body;
  if (!content || content.trim() === "") {
    throw new ApiError(400, "Content is required");
  }
  if (content.length > 280) {
    throw new ApiError(
      400,
      "Content length should not be greater than 280 characters"
    );
  }

  const tweet = await Tweet.create({
    content,
    owner: req.user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "Tweet created successfully", tweet));
});

const getUserTweets = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  if (!userId || !isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid userId");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const tweets = await Tweet.find({ owner: user._id }).sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, "User tweets fetched successfully", tweets));
});

const updateTweet = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  const { content } = req.body;

  if (!tweetId || !isValidObjectId(tweetId)) {
    throw new ApiError(400, "Invalid tweetId");
  }

  if (!content || content.trim() === "") {
    throw new ApiError(400, "Content is required");
  }

  const updatedTweet = await Tweet.findOneAndUpdate(
    { _id: tweetId, owner: req.user._id },
    { content: content.trim() },
    { new: true }
  );

  if (!updatedTweet) {
    throw new ApiError(404, "Tweet not found or user not authorized");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Tweet updated successfully", updatedTweet));
});

const deleteTweet = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  if (!tweetId || !isValidObjectId(tweetId)) {
    throw new ApiError(400, "Invalid tweetId");
  }

  const tweet = await Tweet.findOneAndDelete({
    _id: tweetId,
    owner: req.user._id,
  });

  if (!tweet) {
    throw new ApiError(404, "Tweet not found or user not authorized");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Tweet deleted successfully", tweet));
});

export { createTweet, getUserTweets, updateTweet, deleteTweet };
