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
const getDetailInforDoctor = (id) => {
  return axios.get(`/api/get-detail-infor-doctor?id=${id}`);
};
export {
  getTopDoctorService,
  getAllDoctor,
  saveInforDoctor,
  getDetailInforDoctor,
};
