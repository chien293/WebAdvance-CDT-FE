import React, { useState, createContext, useEffect } from "react";

export const ClassContext = createContext();

export const ClassProvider = ({ children }) => {
  const [studentClass, setStudentClass] = useState([]);
  const [teacherClass, setTeacherClass] = useState([]);

  const updateClasses = (newStudentClass, newTeacherClass) => {
    setStudentClass(newStudentClass);
    setTeacherClass(newTeacherClass);
  };

  return (
    <ClassContext.Provider
      value={{ studentClass, teacherClass, updateClasses }}
    >
      {children}
    </ClassContext.Provider>
  );
};
