// lib/api/cryptoApi.js
import axios from 'axios';

const BASE_URL = 'https://api.coincap.io/v2';

export const getAllCryptos = async (limit = 10) => {
  try {
    const response = await axios.get(`${BASE_URL}/assets?limit=${limit}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching all cryptos:', error);
    throw error;
  }
};

export const getCryptoById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/assets/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching crypto ${id}:`, error);
    throw error;
  }
};

export const getCryptoHistory = async (id, interval = 'd1') => {
  try {
    const response = await axios.get(
      `${BASE_URL}/assets/${id}/history?interval=${interval}`
    );
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching history for ${id}:`, error);
    throw error;
  }
};