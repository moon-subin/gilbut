import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';

const API_BASE_URL = 'http://localhost:8081/';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    async (config) => {
      const token = await SecureStore.getItemAsync('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
);

// [회원가입/시각장애인] 프로필 등록
export const setBlindProfile = async (profileData) => {
    try { 
        const response = await axios.post('/api/blind/settings', profileData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.status === 200) {
            return response;
        }
    } catch (error) {
        console.error("Error during API request:", error);
        throw error;
    }
};

// [회원가입/도우미] 프로필 등록
export const setHelperProfile = async (profileData) => {
    try { 
        const response = await axios.post('/api/helper/settings', profileData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.status === 200) {
            return response;
        }
    } catch (error) {
        console.error("Error during API request:", error);
        throw error;
    }
};