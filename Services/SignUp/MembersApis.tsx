import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import * as SecureStore from 'expo-secure-store';

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

const storeToken = async (token, refreshToken) => {
    try {
      await SecureStore.setItemAsync('accessToken', token);
      await SecureStore.setItemAsync('refreshToken', refreshToken);
    } catch (error) {
      console.error('Error storing the token:', error);
    }
};

const clearToken = async () => {
    try {
      await SecureStore.deleteItemAsync('accessToken');
      await SecureStore.deleteItemAsync('refreshToken');
    } catch (error) {
      console.error('Error clearing the token:', error);
    }
};

// [회원가입] 유저 회원가입-유저 이메일 주소 인증 번호 발송
export const sendEmailVerificationCode = async (email) => {
    try {
      const response = await apiClient.post('/api/members/signup/email-check', { email });
      return response.data;
    } catch (error) {
      console.error('Error sending email verification code:', error);
      throw error;
    }
};

// [회원가입] 유저 회원가입-유저 이메일 코드 입력 후 인증
export const verifyEmailCode = async (email, code) => {
    try {
      const response = await apiClient.post('/api/members/signup/code-verification', { email, code });
      return response.data;
    } catch (error) {
      console.error('Error verifying email code:', error);
      throw error;
    }
};

// [회원가입] 유저 회원가입
export const signUpMember = async (userData) => {
    try {
        const response = await apiClient.post('/api/members/signup', userData);
        if (response.data && response.data.accessToken && response.data.refreshToken) {
            await storeToken(response.data.accessToken, response.data.refreshToken);
        }
        return response.data;
    } catch (error) {
        console.error('Error signing up user:', error);
        throw error;
    }
};


export const loginMember = async (email, password) => {
    try {
      const response = await apiClient.post('/api/members/login', { email, password });
      if (response.data && response.data.accessToken && response.data.refreshToken) {
        await storeToken(response.data.accessToken, response.data.refreshToken);
      }
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
};

export const refreshAccessToken = async () => {
    try {
      const refreshToken = await SecureStore.getItemAsync('refreshToken');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }
      const response = await apiClient.post('/api/members/refresh-token', {}, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });
      if (response.data && response.data.accessToken) {
        await SecureStore.setItemAsync('accessToken', response.data.accessToken);
        return response.data.accessToken;
      }
      throw new Error('Failed to refresh access token');
    } catch (error) {
      console.error('Error refreshing access token:', error);
      throw error;
    }
};