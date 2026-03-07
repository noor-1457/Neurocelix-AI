import axios from "./axios";

export const getUsers = async () => {
  const res = await axios.get("/users");
  return res.data;
};

export const deleteUser = async (id) => {
  const res = await axios.delete(`/users/${id}`);
  return res.data;
};