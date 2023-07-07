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
const getScheduleByDay = (doctorId, date) => {
  return axios.get(
    `/api/get-schedule-by-day?doctorId=${doctorId}&date=${date}`
  );
};
const getExtraInforDoctor = (doctorId) => {
  return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
};
const getProfileDoctor = (doctorId) => {
  return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};
export {
  getTopDoctorService,
  getAllDoctor,
  saveInforDoctor,
  getDetailInforDoctor,
  getScheduleByDay,
  getExtraInforDoctor,
  getProfileDoctor,
};
