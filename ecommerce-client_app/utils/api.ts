import axios from 'axios';

// API client for Product & Order service:
export const productOrderApi = axios.create({
  baseURL: 'http://localhost:3000',  // Change this to product-order-service URL + port
});

// API client for Customer service:
export const customerApi = axios.create({
  baseURL: 'http://localhost:3001',  // Change this to customer-service URL + port
});
