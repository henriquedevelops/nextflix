import axios from "axios";

export default axios.create({
  baseURL: `http://localhost:80/api/v1/`,
  withCredentials: true,
});
