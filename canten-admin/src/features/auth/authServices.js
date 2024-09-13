import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
const login = async (user) => {
  const response = await axios.post(`${base_url}product/admin-login`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
   
  }
  return response.data;
};
const getOrders = async () => {
  const response = await axios.get(`${base_url}order/getalloder`, config);
  console.log(response.data);

  return response.data;
};
const getOrder = async (id) => {
  const response = await axios.post(
    `${base_url}order/getorderbyuser/${id}`,
    "",
    config
  );
   console.log(response.data);
  return response.data;
};

const authService = {
  login,
  getOrders,
  getOrder,
};

export default authService;
