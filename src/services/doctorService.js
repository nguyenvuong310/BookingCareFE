import axios from "../axios";

const getTopDoctorService = (limit) => {
  return axios.get(`/api/top-doctor?limit=${limit}`);
};

export { getTopDoctorService };
