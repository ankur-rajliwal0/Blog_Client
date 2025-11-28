import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:4000/api/v1',    
  baseURL: 'https://blogserver-9ya4.onrender.com/api/v1',  
  
});



export default api;


