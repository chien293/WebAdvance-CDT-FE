import React from "react";
import { useRouter } from "next/router";
import classService from "@/service/class/classService";
import { Logo } from "@/components/landing-page/Icons";
import authService from "@/auth/auth-service";
import Link from "next/link";

const Invitation = () => {
  const router = useRouter();

  // create object with ClassName,title,topic,room,description,teacher for fetch data
  const [classData, setClassData] = React.useState({
    name: "",
    title: "",
    topic: "",
    room: "",
    description: "",
    countStudent: 0,
    countTeacher: 0,
  });

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await classService.getClassByCode(router.query.code);
      setClassData(res);
    };
    if (router.isReady) fetchData();
  }, [router.isReady]);

  const handleJoin = async () => {
    const user = authService.getCurrentUser();

    const enrollmentData = {
      userId: user.user[0].id,
      classId: classData.id,
      role: "student",
    };

    const enrollment = await classService.insertEnrollment(enrollmentData);
    router.push(`/student/class/${classData.id}`);
  };

  return (
    <div className="grid place-items-center h-screen bg-gradient-to-tl from-green-200 p-4">
      <div className="cursor-default select-none space-y-2 rounded-sm bg-[#f2f3f5] p-4 shadow-xl">
        <p className="text-xs font-semibold uppercase text-[#4e5058]">
          You've been invited to join a class
        </p>
        <div className="flex items-center justify-between gap-16">
          <div className="flex items-center gap-4">
            <Logo size="84" />
            <div>
              <h1 className="cursor-pointer font-bold text-[#060607] bold hover:underline">
                {classData.name}
              </h1>
              <p className="text-sm">{classData.title}</p>

              <div className="flex items-center justify-between gap-3 text-xs">
                <p className="text-[#80848e]">
                  Teacher: {classData.countTeacher}
                </p>
                <p className="text-[#80848e]">
                  Student: {classData.countStudent}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={handleJoin}
            className="focus-visible:ring-ring ring-offset-background inline-flex h-10 items-center justify-center rounded-md bg-[#248046] px-4 py-2 text-sm font-medium text-[#e9ffec] transition-colors hover:bg-[#1a6334] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invitation;
