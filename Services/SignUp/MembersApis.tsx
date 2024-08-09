import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import * as SecureStore from 'expo-secure-store';
import mime from 'mime';

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

// [회원가입/도우미] 본인인증-범죄경력회보서, 신분증 인증
export const uploadHelperVerification = async (memberType, idImgUrl, crimImgUrl) => {
  try {
      const formData = new FormData();
      formData.append('memberType', memberType);
      formData.append('image', {
          uri: idImgUrl,
          type: 'application/png', // 파일 유형에 맞게 수정 필요
          name: `${memberType}_idCard.png`,
      });
      formData.append('file', {
        uri: crimImgUrl,
        type: 'application/pdf', // 파일 유형에 맞게 수정 필요
        name: `${memberType}_crimFile.pdf`,
      });

      const response = await apiClient.post('/api/helper/signup/verification', formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      });
      return response.data;
  } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
  }
};

// [회원가입/시각장애인] 본인인증-복지카드 인증
export const uploadWelfareCard = async (memberType, imgUrl) => {
  try {
      const formData = new FormData();
      formData.append('memberType', memberType);
      formData.append('file', {
          uri: imgUrl,
          type: 'image/png', // 이미지 유형에 맞게 수정 필요
          name: `${memberType}_welfareCard.png`,
      });

      const response = await apiClient.post('/api/blind/signup/verification', formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      });
      return response.data;
  } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
  }
};