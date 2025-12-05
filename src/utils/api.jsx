import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:4000/api/v1',    
  baseURL: 'https://blogserver1-t1yt.onrender.com/api/v1',    
  
  
});



export default api;


