import API from "./client.js";

// Create tweet
export const createTweet = (data) => API.post("/tweets", data);

// Get user tweets
export const getUserTweets = (userId) => API.get(`/tweets/user/${userId}`);

// Update tweet
export const updateTweet = (tweetId, data) =>
  API.patch(`/tweets/${tweetId}`, data);

// Delete tweet
export const deleteTweet = (tweetId) => API.delete(`/tweets/${tweetId}`);
