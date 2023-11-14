import axios from "axios";

const API_URL = "http://localhost:5000/auth/";

class AuthService {
  async login(email, password) {
    const response = await axios.post(API_URL + "login", {
      email,
      password,
    });
    console.log(response.data);
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem("user");
  }

  async register(email, fullname, password) {
    console.log(email, fullname, password);
    return await axios.post(API_URL + "signup", {
      email,
      fullname,
      password,
    });
  }

  getCurrentUser() {
    if (typeof window !== "undefined") {
      return localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null;
    } else {
      console.log("WINDOW NULL");
    }
    //return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();
