/**
 * Fetch with automatic retry logic.
 * Handles Render free-tier cold starts by retrying failed requests.
 *
 * @param {string} url - The URL to fetch
 * @param {object} options - Standard fetch options (method, headers, body, etc.)
 * @param {number} retries - Number of retry attempts (default: 3)
 * @param {number} delay - Delay between retries in ms (default: 2000)
 * @returns {Promise<Response>} - The fetch Response object
 */
export const fetchWithRetry = async (url, options = {}, retries = 3, delay = 2000) => {
    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            const response = await fetch(url, options);
            return response;
        } catch (err) {
            // If this was the last attempt, throw the error
            if (attempt >= retries) throw err;

            console.warn(
                `[fetchWithRetry] Attempt ${attempt + 1} failed for ${url}. Retrying in ${delay}ms...`
            );
            await new Promise((resolve) => setTimeout(resolve, delay));
        }
    }
};
