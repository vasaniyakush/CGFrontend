import Axios from "axios";

// let urls = {
//     test: `https://zljf0gm0-3000.inc1.devtunnels.ms/api/v1/`,
//     development: 'https://zljf0gm0-3000.inc1.devtunnels.ms/api/v1/',
//     production: 'https://zljf0gm0-3000.inc1.devtunnels.ms/api/v1/'
// }
let urls = {
  test: `http://localhost:3000`,
  development: "http://localhost:3000/api/v1/",
  production: "https://localhost:3000/api/v1/",
};
const api = Axios.create({
  baseURL: urls[process.env.NODE_ENV || "production"],
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;
