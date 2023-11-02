import axios from 'axios';
import { useUserStore } from '../UserStore';

const apiClient = axios.create({
  baseURL: 'http://localhost:3333/api/',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Add an interceptor to include the token with every request
apiClient.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    const token = userStore.token;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    //console.log('config: ', config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// apiClient.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     if (error.response.status === 401) {
//       // Token has expired, attempt to refresh it
//       try {
//         const refreshedToken = await refreshToken(); // Implement your token refresh logic
//         if (refreshedToken) {
//           TokenService.setToken(refreshedToken);
//           // Retry the original request with the new token
//           return apiClient(error.config);
//         }
//       } catch (refreshError) {
//         // Token refresh failed, handle as needed
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default apiClient;
