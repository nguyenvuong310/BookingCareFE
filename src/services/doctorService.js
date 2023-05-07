import axios from "../axios";

const getTopDoctorService = (limit) => {
  return axios.get(`/api/top-doctor?limit=${limit}`);
};
const getAllDoctor = () => {
  return axios.get(`/api/get-all-doctor`);
};
const saveInforDoctor = (data) => {
  return axios.post(`/api/post-infor-doctor`, data);
};

export { getTopDoctorService, getAllDoctor, saveInforDoctor };
