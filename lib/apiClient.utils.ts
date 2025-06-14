// Import axios
import axios from 'axios';

// Create an axios instance
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Replace with your API base URL
  timeout: 10000, // Set a reasonable timeout (10 seconds)
  headers: {
    'Accept': 'application/json', // Default accept header
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Automatically set the correct Content-Type
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else if (typeof config.data === 'object' && config.data !== null) {
      config.headers['Content-Type'] = 'application/json';
    }

    // Optionally, attach tokens if required
    const token = localStorage.getItem('authToken'); // Replace with your token logic
    if (token) {
      config.headers['Authorization'] = `${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Return the response data directly
    return response.data;
  },
  (error) => {
    // Handle errors gracefully
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error('Error response:', error.response);
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request
      console.error('Error in request setup:', error.message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
