import axios from 'axios';

const http = axios.create({
  // set the API root so we can use relative url's in our actions.
  baseURL: 'http://localhost:3000'
});

export default http; 