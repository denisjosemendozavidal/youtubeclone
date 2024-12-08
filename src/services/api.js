const BASE_URL = "https://youtube.googleapis.com/youtube/v3";
const API_KEY = "your_api_key";

// Helper function for handling API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "API call failed");
  }
  return response.json();
};

// Base fetch function with common configuration
export const fetchFromAPI = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });
    return handleResponse(response);
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
