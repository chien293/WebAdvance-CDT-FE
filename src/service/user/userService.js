import axios from "axios";
import AuthService from "@/auth/auth-service";

const API_URL = process.env.SERVER_URL;
const token = AuthService.getAccessToken();

class UserService {
  async getUserInfo(userId) {
    try {
      const response = await axios.get(API_URL + "/getUser/" + userId, {
        headers: {
          token: `Bearer ${token}`,
        },
      });
      return response.data[0];
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  //update user avatar
  async updateUserImage(userId, image) {
    try {
      const response = await axios.put(
        API_URL + "/updateImage",
        {
          id: userId,
          image: image,
        },
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
}

export default new UserService();
