import axios from "../axios";
const handleLoginApi = async (email, password) => {
  console.log(email);
  try {
    return axios.post("/api/login", { email: email, password: password });
  } catch (error) {
    console.log(error);
  }
};
export { handleLoginApi };
