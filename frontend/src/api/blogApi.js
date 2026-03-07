import axios from "axios";
const token = localStorage.getItem("token");

export const getBlogs = async (page = 1, limit = 10, search = "") => {
  const res = await axios.get(`http://localhost:5000/api/blogs?page=${page}&limit=${limit}&search=${search}`);
  return res.data; // res.data = { success, data, total, pages }
};

export const createBlog = async (data) => {
  const res = await axios.post("/blogs", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateBlog = async (id, data) => {
  const res = await axios.put(`/blogs/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteBlog = async (id) => {
  const res = await axios.delete(`/blogs/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};