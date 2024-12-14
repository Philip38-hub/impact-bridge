import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Configure axios to use the token from localStorage
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const businessService = {
  // Create a new business
  createBusiness: async (businessData) => {
    try {
      const response = await axios.post(`${API_URL}/api/v1/businesses`, businessData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to create business';
    }
  },

  // Get all businesses with optional filters
  listBusinesses: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });
      
      const response = await axios.get(`${API_URL}/api/v1/businesses?${queryParams}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to fetch businesses';
    }
  },

  // Get a business by ID
  getBusinessById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/businesses/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to fetch business';
    }
  },

  // Update a business
  updateBusiness: async (id, businessData) => {
    try {
      const response = await axios.put(`${API_URL}/api/v1/businesses/${id}`, businessData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to update business';
    }
  },

  // Delete a business
  deleteBusiness: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/api/v1/businesses/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to delete business';
    }
  }
}; 