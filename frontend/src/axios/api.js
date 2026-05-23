import axios from "axios";

// cria instância do axios com baseURL
const api = axios.create({
  baseURL: "http://localhost:8000" // onde está seu PHP
});

export default api;