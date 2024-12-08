import { fetchFromAPI } from "./api";

export const YouTubeService = {
  // Get videos for kids
  getKidsVideos: async () => {
    try {
      const response = await fetchFromAPI("/search", {
        params: {
          part: "snippet",
          maxResults: 50,
          q: "kids content",
          type: "video",
          videoCategoryId: "1", // Film & Animation
          safeSearch: "strict",
          key: API_KEY,
        },
      });
      return response.items;
    } catch (error) {
      console.error("Error fetching kids videos:", error);
      throw error;
    }
  },

  // Get video details
  getVideoDetails: async (videoId) => {
    try {
      const response = await fetchFromAPI("/videos", {
        params: {
          part: "snippet,contentDetails,statistics",
          id: videoId,
          key: API_KEY,
        },
      });
      return response.items[0];
    } catch (error) {
      console.error("Error fetching video details:", error);
      throw error;
    }
  },
};
