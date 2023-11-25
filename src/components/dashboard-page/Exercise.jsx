import React from "react";

const Exercise = () => {
  const teachers = [
    { id: 1, name: "Khanh Huy Nguyen" },
    { id: 2, name: "Tuan Mai Anh" },
  ];
  const students = [
    { id: 1, name: "Tran Dam Gia Huy" },
    { id: 2, name: " Vu Hoang Anh" },
    { id: 3, name: "Toan Banh Hao" },
  ];

  return (
    <div className="flex flex-col w-6/12 font-medium">
      <div className="text-green-600 text-4xl p-5 border-b border-green-600">
        Teacher
      </div>
      <ul>
        {teachers.map((teacher) => (
          <li className="border-b p-5" key={teacher.id}>
            {teacher.name}
          </li>
        ))}
      </ul>
      <div className="flex flex-row text-green-600 p-5 border-b border-green-600 justify-between">
        <div className="text-4xl">Student</div>
        <div className="flex items-end">{students.length} student</div>
      </div>
      <ul>
        {students.map((student) => (
          <li className="border-b p-5" key={student.id}>
            {student.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Exercise;
