import axios from "axios";
export default class AuthService {
  static async logIn(email: string, password: string) {
    return axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
      email: email,
      password: password,
    });
  }
  static async register(email: string, password: string) {
    return axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
      email: email,
      password: password,
    });
  }
}
