import axios from "axios";

const instance = axios.create({
  baseURL: "https://market.bits-dvm.org/"
});

export default instance;
