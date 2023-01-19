import axios from "../axios";
const handleLoginApi = async (email, password) => {
  try {
    return axios.post("/api/login", { email: email, password: password });
  } catch (error) {
    console.log(error);
  }
};
const getAllUsers = (inputId) => {
  //template string
  return axios.get(`/api/get-all-users?id=${inputId}`);
};
export { handleLoginApi, getAllUsers };
