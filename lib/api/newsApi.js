// lib/api/newsApi.js
import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_NEWSDATA_API_KEY;
const BASE_URL = 'https://newsdata.io/api/1';

export const getCryptoNews = async (limit = 5) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/news?apikey=${API_KEY}&q=cryptocurrency&language=en&category=business`
    );
    return response.data.results.slice(0, limit);
  } catch (error) {
    console.error('Error fetching crypto news:', error);
    throw error;
  }
};