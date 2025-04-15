// src/services/user.ts
import api from "./api";

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: string;
}

export async function registerUser(data: RegisterData) {
  return await api.post("/users/register", data);
}
