import axios from 'axios';

// Configure with credentials
axios.defaults.baseURL = 'http://127.0.0.1:8000/';
axios.defaults.withCredentials = true;

export default axios;
