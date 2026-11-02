import API from "./client.js";

// Create playlist
export const createPlaylist = (data) => API.post("/playlists", data);

// Get playlist by ID
export const getPlaylistById = (playlistId) =>
  API.get(`/playlists/${playlistId}`);

// Update playlist
export const updatePlaylist = (playlistId, data) =>
  API.patch(`/playlists/${playlistId}`, data);

// Delete playlist
export const deletePlaylist = (playlistId) =>
  API.delete(`/playlists/${playlistId}`);

// Add video to playlist
export const addVideoToPlaylist = (videoId, playlistId) =>
  API.patch(`/playlists/add/${videoId}/${playlistId}`);

// Remove video from playlist
export const removeVideoFromPlaylist = (videoId, playlistId) =>
  API.patch(`/playlists/remove/${videoId}/${playlistId}`);

// Get user playlists
export const getUserPlaylists = (userId) =>
  API.get(`/playlists/user/${userId}`);
