// frontend/src/api/youtubeApi.js

const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3";

const fetchData = async (query = "", maxResults = 10) => {
  const apiKey =
    import.meta.env.VITE_YOUTUBE_API_KEY ||
    import.meta.env.VITE_API_KEY;

  if (!apiKey) {
    console.error("VITE_YOUTUBE_API_KEY is not defined in frontend/.env");
    throw new Error("Missing YouTube API Key. Please add VITE_YOUTUBE_API_KEY to frontend/.env");
  }

  try {
    const url = `${YOUTUBE_BASE_URL}/search?part=snippet&type=video&maxResults=${maxResults}&q=${encodeURIComponent(
      query || "JavaScript"
    )}&key=${apiKey}`;

    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage =
        errorData?.error?.message || `YouTube API responded with status ${response.status}`;
      console.error("YouTube API Error:", errorMessage);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error("Error fetching data from YouTube API:", error);
    throw error;
  }
};

export { fetchData };
