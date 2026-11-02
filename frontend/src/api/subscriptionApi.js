import API from "./client.js";

// Toggle subscription to channel
export const toggleSubscription = (channelId) =>
  API.post(`/subscriptions/channel/${channelId}`);

// Get channels subscribed to by user
export const getSubscribedChannels = (subscriberId) =>
  API.get(`/subscriptions/user/${subscriberId}`);

// Get channel subscribers
export const getChannelSubscribers = (channelId) =>
  API.get(`/subscriptions/channel/${channelId}`);
