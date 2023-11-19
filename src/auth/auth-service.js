import axios from "axios";

const API_URL = "http://localhost:5000/auth/";

class AuthService {
  async login(email, password) {
    const response = await axios.post(API_URL + "login", {
      email,
      password,
    });
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem("user");
  }

  async register(email, fullname, password) {
    return await axios.post(API_URL + "signup", {
      email,
      fullname,
      password,
    });
  }

  sentValidateEmail(email) {
    axios.get(API_URL + "verifyAccount", {
      params: {
        email: email,
      },
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
