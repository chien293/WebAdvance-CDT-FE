import axios from "axios";

const API_URL = process.env.SERVER_URL;

class AuthService {
  async login(email, password) {
    const response = await axios.post(API_URL + "/auth/login", {
      email,
      password,
    });
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }

  loginGoogle() {
    window.open(API_URL + "/auth/google", "_self");
    // if (response.data.accessToken) {
    //   localStorage.setItem("user", JSON.stringify(response.data));
    // }
  }

  async loginGoogleSuccess() {
    return await axios.get(API_URL + "/auth/google/success").then((res) => {
      console.log(res.data);
      if (res.data) {
        return res.user;
      }
    });

    // if (response.data.accessToken) {
    //   localStorage.setItem("user", JSON.stringify(response.data));
    // }
  }

  async loginFacebook(email, password) {
    const response = await axios.post(API_URL + "/auth/facebook", {
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
    return await axios.post(API_URL + "/auth/signup", {
      email,
      fullname,
      password,
    });
  }

  async sentValidateEmail(email) {
    return axios.get(API_URL + "/auth/forgot-password", {
      params: {
        email: email,
      },
    });
  }

  // sentForgotPassword(email) {
  //   axios.get(API_URL + "forgot-assword", {
  //     email
  //   });
  // }

  async sentResetPassword(token, email, password) {
    console.log(token);
    return await axios.post(
      API_URL + "/auth/forgot-password",
      {
        email,
        password,
      },
      {
        headers: {
          token: "Bearer " + token,
        },
      }
    );
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

  getAccessToken() {
    if (typeof window !== "undefined") {
      return localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).accessToken
        : null;
    } else {
      console.log("ACCESS TOKEN NULL");
    }
  }
}

export default new AuthService();
