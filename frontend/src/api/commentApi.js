import API from "./client.js";

export const fetchComments = (videoId, page = 1, limit = 15) =>
  API.get(`/comments/${videoId}?page=${page}&limit=${limit}`);

export const addComment = (videoId, data) =>
  API.post(`/comments/${videoId}`, data);

export const updateComment = (commentId, data) =>
  API.patch(`/comments/${commentId}`, data);

export const deleteComment = (commentId) =>
  API.delete(`/comments/${commentId}`);
