import { useState, useEffect } from "react";
import { YouTubeService } from "../services/youtube";

export const useYouTube = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const fetchedVideos = await YouTubeService.getKidsVideos();
      setVideos(fetchedVideos);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return { videos, loading, error, refreshVideos: fetchVideos };
};
