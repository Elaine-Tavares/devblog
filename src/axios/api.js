import axios from "axios";

// cria instância do axios com baseURL
const api = axios.create({
  baseURL: "https://elainetavaresweb.com/devblog/backend/" // onde está seu PHP
});

export default api;