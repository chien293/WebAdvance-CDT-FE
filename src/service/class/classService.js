import axios from "axios";
import AuthService from "@/auth/auth-service";

const API_URL = process.env.SERVER_URL + "/class";
const token = AuthService.getAccessToken();

class ClassService {
  async getClassInfo(classId) {
    try {
      const response = await axios.get(API_URL + "/getAClass/" + classId, {
        headers: {
          token: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  async updateClassInfo(classId, data) {
    try {
      data.classId = classId;
      const response = await axios.post(API_URL + "/updateClass", data, {
        headers: {
          token: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
}
export default new ClassService();
