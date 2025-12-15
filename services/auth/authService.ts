import axios, { AxiosError } from 'axios';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL!;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL + 'users/',
  timeout: 30000,
});

class AuthService {
  async signup(data: {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
    country: string;
    currency: string;
  }) {
    try {
      const response = await axiosInstance.post('signup', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return { data: response.data, status: response.status };
    } catch (error) {
      if (error && error instanceof AxiosError) {
        return { message: error.response?.data.message };
      }
      return { message: 'An unexpected error occurred. Please try again.' };
    }
  }
  async login(data: { email: string; password: string }) {
    try {
      const response = await axiosInstance.post('login', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return { data: response.data, status: response.status };
    } catch (error) {
      if (error && error instanceof AxiosError) {
        return { message: error.response?.data.message };
      }
      return { message: 'An unexpected error occurred. Please try again.' };
    }
  }

  async forgotPassword(data: { email: string }) {
    try {
      const response = await axiosInstance.post('forgotPassword', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return { data: response.data, status: response.status };
    } catch (error) {
      if (error && error instanceof AxiosError) {
        return { message: error.response?.data.message };
      }
      return { message: 'An unexpected error occurred. Please try again.' };
    }
  }

  async resetPassword(data: { password: string; passwordConfirm: string; token: string }) {
    try {
      const response = await axiosInstance.post('resetPassword', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return { data: response.data, status: response.status };
    } catch (error) {
      if (error && error instanceof AxiosError) {
        return { message: error.response?.data.message };
      }
      return { message: 'An unexpected error occurred. Please try again.' };
    }
  }

  async getMe(token: string) {
    try {
      const response = await axiosInstance.get('me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { data: response.data, status: response.status };
    } catch (error) {
      if (error && error instanceof AxiosError) {
        return { message: error.response?.data.message };
      }
      return { message: 'An unexpected error occurred. Please try again.' };
    }
  }

  async updatePushToken(token: string, expoPushToken: string) {
    try {
      const response = await axiosInstance.patch(
        'expoPushToken',
        { expoPushToken },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return { data: response.data, status: response.status };
    } catch (error) {
      if (error && error instanceof AxiosError) {
        return { message: error.response?.data.message };
      }
      return { message: 'An unexpected error occurred. Please try again.' };
    }
  }

  async updatePassword(
    token: string,
    data: { passowrdCurrent: string; password: string; passwordConfirm: string }
  ) {
    try {
      const response = await axiosInstance.patch('updatePassword', data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { data: response.data, status: response.status };
    } catch (error) {
      if (error && error instanceof AxiosError) {
        return { message: error.response?.data.message };
      }
      return { message: 'An unexpected error occurred. Please try again.' };
    }
  }
}
const authService = new AuthService();
export default authService;
