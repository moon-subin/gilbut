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

// [시각장애인] 의뢰 등록
export const registerRequest = async (requestData) => {
    try { 
        const response = await axios.post('/api/blind/requests', requestData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.status === 201) {
            return response;
        }
    } catch (error) {
        console.error("Error during API request:", error);
        throw error;
    }
}
