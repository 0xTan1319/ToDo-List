import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api/v1",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

axiosInstance.interceptors.request.use();

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data.message) {
      alert(response.data.message);
    }
    return response.data;
  },
  (error) => {
    if (error.response) {
      alert(`Error: ${error.response.status} - ${error.response.data.message}`);
    } else if (error.request) {
      alert("No response from server. Please try again.");
    } else {
      alert(`Error: ${error.message}`);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
