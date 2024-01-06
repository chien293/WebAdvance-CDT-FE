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

  //get invite code in class
  async getInviteCode(classId) {
    try {
      const data = {};
      data.classId = classId;
      const response = await axios.get(API_URL + "/getInviteCode/", {
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

  //post reset invite code in class
  async resetInviteCode(classId) {
    try {
      const data = {};
      data.classId = classId;
      const response = await axios.post(API_URL + "/resetInviteCode", data, {
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
  async getClassByCode(code) {
    const data = {};
    data.code = code;
    try {
      const response = await axios.post(API_URL + "/getClassByCode/", data, {
        headers: {
          token: `Bearer ${token}`,
        },
      });
      const result = response.data;
      const formatData = {
        ...result[0],
        countStudent: result.countStudent,
        countTeacher: result.countTeacher,
      };

      return formatData;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  //insert a class
  async insertClass(data) {
    try {
      const response = await axios.post(API_URL + "/insertClass", data, {
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

  //insert enrollment
  async insertEnrollment(data) {
    try {
      const response = await axios.post(API_URL + "/insertEnrollment", data, {
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
  async getRoleInClass(userId, classId) {
    const data = {};
    data.userId = userId;
    data.classId = classId;
    try {
      const response = await axios.post(API_URL + "/getRoleInClass", data, {
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
  async getParticipants(id) {
    try {
      const response = await axios.get(API_URL + `/getParticipants/${id}`, {
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

  async getInfoTeacherOfClass(classId) {
    const data = {};
    data.id = classId;
    try {
      const response = await axios.post(
        API_URL + "/getInfoTeacherOfClass",
        data,
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      return response.data[0].image;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  async checkUserInClass(email, classId) {
    const data = {};
    data.email = email;
    data.classId = classId;
    try {
      const response = await axios.post(API_URL + "/checkUserInClass", data, {
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

  async inviteByEmail(email, classId, role) {
    const data = {};
    data.email = email;
    data.classId = classId;
    data.role = role;
    const user = AuthService.getCurrentUser();
    data.from = user.user[0].email;
    try {
      const response = await axios.post(API_URL + "/inviteByEmail", data, {
        headers: {
          token: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new ClassService();
