import { dev } from '$app/environment';

const config = dev
  ? {
      apiUrl: 'http://localhost:3001'
    }
  : {
      apiUrl: 'https://mywebsite.com'
    };

export default config;
