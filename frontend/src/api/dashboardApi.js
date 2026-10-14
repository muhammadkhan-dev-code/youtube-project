import API from "./client.js";

// Get channel stats
export const getChannelStats = () => API.get("/dashboard/status");

// Get channel videos
export const getChannelVideos = () => API.get("/dashboard/videos");
