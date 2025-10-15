// Helper function for exponential backoff on API calls
export const fetchWithRetry = async (url, options, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) return response;

      // Retry only for server or rate limit errors
      if (response.status >= 500 || response.status === 429) {
        throw new Error(`Server error or rate limit: ${response.status}`);
      }

      // For 4xx errors, stop retrying
      return response;
    } catch (error) {
      if (i === retries - 1) throw error;
      const delay = Math.pow(2, i) * 1000 + Math.random() * 1000;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};
