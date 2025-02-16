import axios from 'axios';

const API_BASE_URL = "http://127.0.0.1:8000"; // FastAPI backend URL

// Function to fetch latest legal news
export const fetchNews = async (token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/news/scrape`, {
            headers: {
                Authorization: `Bearer ${token}` // Send JWT token for authorization
            }
        });
        return response.data.news;
    } catch (error) {
        console.error("Error fetching news:", error);
        return [];
    }
};