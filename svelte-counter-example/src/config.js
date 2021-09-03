const config = process.env.production
  ? {
      apiUrl: "https://mywebsite.com",
    }
  : {
      apiUrl: "http://localhost:5554",
    };

export default config;
