import axios from 'axios';
import { BASE_URL } from '../API/API';

const API_URL = `${BASE_URL}/customers`;

const customerApi = {
  createCustomer: async (customerData) => {
    try {
      const response = await axios.post(`${API_URL}`, customerData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  updateCustomerStep: async (customerData) => {
    try {
      const response = await axios.patch(`${API_URL}/${customerData.CustID_Nr}`, customerData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  verifyOtp: async (otpData) => {
    try {
      const response = await axios.post(`${API_URL}/verify-otp`, otpData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
};

export default customerApi;
