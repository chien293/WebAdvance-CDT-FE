import axios from "axios";
import React, { useEffect, useState } from "react";
import authService from "@/auth/auth-service";
const ParticipantStudent = ({ classId }) => {
  const [participants, setParticipants] = useState([]);

  const [token, setToken] = useState(null);
  const API_URL = process.env.SERVER_URL;
  useEffect(() => {
    const takeUser = () => {
      const user = authService.getCurrentUser();
      if (user) {
        setToken(user.accessToken);
      }
    };

    takeUser();
  })

  useEffect(() => {
    if (token) {
      getClasses();
    }
  }, [token])

  const getClasses = async () => {
    await axios.get(API_URL + `/class/getParticipants/${classId}`,
      {
        headers: {
          token: "Bearer " + token,
        },
      }).then((data) => {
      if (data) {
        setParticipants(data.data)
      }
    })
  }

  return (
    <div className="flex flex-col w-6/12 font-medium ml-40">
      <div className="text-green-600 text-4xl p-5 border-b border-green-600">
        Teacher
      </div>
      <ul>
        {participants.length > 0 ? (
          participants
            .filter((item) => item.role === 'teacher')
            .map((teacher) => (
              <li className="border-b p-5" key={teacher.fullname}>
                {teacher.fullname}
              </li>
            ))
        ) : (
          <li className="border-b p-5">No teachers available</li>
        )}
      </ul>
      <div className="flex flex-row text-green-600 p-5 border-b border-green-600 justify-between">
        <div className="text-4xl">Student</div>
        <div className="flex items-end">
          {participants.length > 0
            ? `${participants.filter((item) => item.role === 'student').length} student`
            : 'No students available'}
        </div>
      </div>
      <ul>
        {participants.length > 0 ? (
          participants
            .filter((item) => item.role === 'student')
            .map((student) => (
              <li className="border-b p-5" key={student.fullname}>
                {student.fullname}
              </li>
            ))
        ) : (
          <li className="border-b p-5">No students available</li>
        )}
      </ul>
    </div>
  );
};

export default ParticipantStudent;
