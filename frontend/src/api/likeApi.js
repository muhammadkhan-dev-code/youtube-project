import API from "./client.js";

// Toggle like on video
export const toggleVideoLike = (videoId) =>
  API.post(`/likes/toggle/v/${videoId}`);

// Toggle like on comment
export const toggleCommentLike = (commentId) =>
  API.post(`/likes/toggle/c/${commentId}`);

// Toggle like on tweet
export const toggleTweetLike = (tweetId) =>
  API.post(`/likes/toggle/t/${tweetId}`);

// Get all liked videos
export const getLikedVideos = () => API.get("/likes/videos");
