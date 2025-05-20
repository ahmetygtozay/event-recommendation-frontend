// src/api/api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8000'; // Adjust if needed

export const login = async (username, password) => {
  const response = await axios.post(`${BASE_URL}/api/login`, { username, password });
  return response.data;
};

export const register = async (username, password) => {
  const response = await fetch("http://localhost:8000/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.detail || "Registration failed.");
  }

  return await response.json(); // should return user_id
};


export const getRecommendations = async (userId, query) => {
  const response = await axios.post(`${BASE_URL}/api/recommend`, { user_id: userId, query });
  return response.data;
};

export const getEventById = async (id) => {
  const response = await axios.get(`${BASE_URL}/api/events/${id}`);
  return response.data;
};

export const getUserHistory = async (userId) => {
  const response = await axios.get(`${BASE_URL}/api/users/${userId}/history`);
  return response.data;
};
