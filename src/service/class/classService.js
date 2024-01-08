import axios from "axios";
import AuthService from "@/auth/auth-service";
import { data } from "autoprefixer";

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

  async getEnrollmentForReview(classId, userId) {
    const data = {};
    data.classId = classId;
    data.userId = userId;
    try {
      const response = await axios.post(
        API_URL + "/getIdByUserIdAndClassId",
        data,
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  //get a grade
  async getAGrade(classId, userId, type) {
    const data = {};
    data.classId = classId;
    data.userId = userId;
    data.type = type;
    try {
      const response = await axios.post(API_URL + "/getAGrade", data, {
        headers: {
          token: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  //insert review grade
  async insertReviewGrade(
    enrollmentId,
    selectGradeId,
    expectedGrade,
    explanation,
    userId,
    url
  ) {
    const data = {};
    data.enrollmentId = enrollmentId;
    data.selectGradeId = selectGradeId;
    data.expectedGrade = expectedGrade;
    data.explanation = explanation;
    data.userId = userId;
    data.url = url;
    try {
      const response = await axios.post(API_URL + "/insertReviewGrade", data, {
        headers: {
          token: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  //getReviewGrade
  async getReviewGrade(classId, userId) {
    const data = {};
    data.classId = classId;
    data.userId = userId;
    try {
      const response = await axios.post(API_URL + "/getReviewGrade", data, {
        headers: {
          token: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  //getCommentByReviewGradeId
  async getCommentByReviewGradeId(reviewGradeId) {
    const data = {};
    data.reviewGradeId = reviewGradeId;
    try {
      const response = await axios.post(
        API_URL + "/getCommentByReviewGradeId",
        data,
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  //insert comment
  async insertComment(reviewGradeId, userId, message, role, url) {
    const data = {};
    data.reviewGradeId = reviewGradeId;
    data.userId = userId;
    data.content = message;
    data.role = role;
    data.url = url;
    try {
      const response = await axios.post(API_URL + "/insertComment", data, {
        headers: {
          token: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  async getReviewGradeById(reviewGradeId) {
    const data = {};
    data.idReviewGrade = reviewGradeId;
    try {
      const response = await axios.post(API_URL + "/getReviewGradeById", data, {
        headers: {
          token: `Bearer ${token}`,
        },
      });
      return response.data[0];
    } catch (error) {
      throw error;
    }
  }
  //getReviewGradeByClassId
  async getReviewGradeByClassId(classId) {
    const data = {};
    data.classId = classId;
    try {
      const response = await axios.post(
        API_URL + "/getReviewGradeByClassId",
        data,
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  //getUserIdByReviewGradeId
  async getUserIdByReviewGradeId(reviewGradeId) {
    const data = {};
    data.reviewGradeId = reviewGradeId;
    try {
      const response = await axios.post(
        API_URL + "/getUserIdByReviewGradeId",
        data,
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      return response.data[0].userId;
    } catch (error) {
      throw error;
    }
  }
  //getTeacherIdByReviewGradeId
  async getTeacherIdByReviewGradeId(reviewGradeId) {
    const data = {};
    data.reviewGradeId = reviewGradeId;
    try {
      const response = await axios.post(
        API_URL + "/getTeacherIdByReviewGradeId",
        data,
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      return response.data[0].userId;
    } catch (error) {
      throw error;
    }
  }
  //updateGradeAndStatusOfReviewGrade
  async updateGradeAndStatusOfReviewGrade(
    reviewGradeId,
    grade,
    status,
    userId,
    role,
    url
  ) {
    const data = {};
    data.reviewGradeId = reviewGradeId;
    data.grade = grade;
    data.status = status;
    data.userId = userId;
    data.role = role;
    data.url = url;

    try {
      const response = await axios.post(
        API_URL + "/updateGradeAndStatusOfReviewGrade",
        data,
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  //getRoleByReviewGradeId
  async getRoleByReviewGradeId(reviewGradeId, userId) {
    const data = {};
    data.reviewGradeId = reviewGradeId;
    data.userId = userId;
    try {
      const response = await axios.post(
        API_URL + "/getRoleByReviewGradeId",
        data,
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new ClassService();
