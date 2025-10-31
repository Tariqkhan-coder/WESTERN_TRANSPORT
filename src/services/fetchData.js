import axiosInstance from "./axiosInstance";

const getData = async (endpoint, params = {}) => {
  try {
    const response = await axiosInstance.get(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error("GET Error:", error);
    throw error;
  }
};

const postData = async (endpoint, payload = {}, isFormData = false) => {
  try {
    const config = isFormData
      ? { headers: { "Content-Type": "multipart/form-data" } }
      : {};

    const response = await axiosInstance.post(endpoint, payload, config);
    return response.data;
  } catch (error) {
    console.error("POST Error:", error);
    throw error;
  }
};


const putData = async (endpoint, payload = {}) => {
  try {
    const response = await axiosInstance.put(endpoint, payload);
    return response.data;
  } catch (error) {
    console.error("PUT Error:", error);
    throw error;
  }
};

const patchData = async (endpoint, payload = {}) => {
  try {
    const response = await axiosInstance.patch(endpoint, payload);
    return response.data;
  } catch (error) {
    console.error("PATCH Error:", error);
    throw error;
  }
};

const deleteData = async (endpoint) => {
  try {
    const response = await axiosInstance.delete(endpoint);
    return response.data;
  } catch (error) {
    console.error("DELETE Error:", error);
    throw error;
  }
};


const adminService = {
  getAdmins: () => getData("/api/Admin/CreateAdmin"),
  getAdmin: (id) => getData(`/api/Admin/CreateAdmin/${id}`),
  createAdmin: (payload) => postData("/api/Admin/CreateAdmin", payload),
  loginAdmin: (payload) => postData("/api/Admin/LoginAdmin", payload),
  updateAdmin: (id, payload) => putData(`/api/Admin/CreateAdmin/${id}`, payload),
  patchAdmin: (id, payload) => patchData(`/api/Admin/CreateAdmin/${id}`, payload),
  deleteAdmin: (id) => deleteData(`/api/Admin/CreateAdmin/${id}`),
  
};

const driverService = {
  getDrivers: () => getData("/api/Driver/CreateDriver"),
  getDriver: (id) => getData(`/api/Driver/CreateDriver/${id}`),
  createDriver: (payload) => postData("/api/Driver/CreateDriver", payload),
  uploadDocuments: (formData) => postData("/api/Driver/UploadDocuments", formData, true),
  requestLoad: (payload) => postData("/api/Driver/RequestLoad", payload),
  updateDriver: (id, payload) => putData(`/api/Driver/CreateDriver/${id}`, payload),
  patchDriver: (id, payload) => patchData(`/api/Driver/CreateDriver/${id}`, payload),
  deleteDriver: (id) => deleteData(`/api/Driver/CreateDriver/${id}`),
};


const loadService = {
  getLoads: () => getData("/api/Load/GetAllLoads"),
  getLoad: (id) => getData(`/api/Load/GetLoad/${id}`),
  createLoad: (payload) => postData("/api/Load/CreateLoad", payload),
  updateLoad: (id, payload) => putData(`/api/Load/UpdateLoad/${id}`, payload),
  deleteLoad: (id) => deleteData(`/api/Load/DeleteLoad/${id}`),
  requestLoad: (payload) => postData("/api/Driver/RequestLoad", payload),
};

export { adminService, driverService, loadService };
