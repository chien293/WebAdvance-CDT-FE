import React from "react";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  User,
} from "@nextui-org/react";
import ParticipantContent from "../class/ParticipantContent";
import Link from "next/link";
import classService from "@/service/class/classService";

const CoursesInfo = ({ id, name, title, teacher, role, image }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [participants, setParticipants] = React.useState([]);
  const handleClick = async () => {
    onOpen();
    const data = await classService.getParticipants(id);
    setParticipants(data);
  };
  return (
    <div className="relative mx-10 mt-5">
      <Link
        key={id}
        href={{
          pathname:
            role === "teacher" ? `/teacher/class/${id}` : `student/class/${id}`,
        }}
        passHref
      >
        <div className="flex flex-col relative h-80 w-80 border rounded-lg  bg-green-200  overflow-hidden shadow-md hover:drop-shadow-lg">
          <div className="relative w-full h-1/3 bg-green-600 text-white">
            <div className="pt-3 px-3">
              <div className="hover:underline truncate font-bold text-2xl">
                {name}
              </div>
              <div className="hover:underline font-medium">{title}</div>
              <div className="hover:underline font-medium">{teacher}</div>
            </div>
            <div className="absolute w-20 h-20 -bottom-10 left-1/2 transform translate-x-3/4 border bg-white rounded-full">
              <img src={image} className="w-20 h-20 rounded-full" />
            </div>
          </div>
        </div>
      </Link>
      <div className="flex absolute bottom-0 right-0">
        <div
          className="hover:bg-gray-200 rounded-full mr-3 p-2 cursor-pointer"
          onClick={handleClick}
        >
          <AssignmentIndOutlinedIcon />
          <Modal
            size="3xl"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            scrollBehavior="inside"
            className="h-2/4"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Participants
                  </ModalHeader>
                  <ModalBody>
                    <h1 className="font-bold">Teachers</h1>
                    {participants.length > 0 ? (
                      participants
                        .filter((item) => item.role === "teacher")
                        .map((student) => (
                          <li className="p-5" key={student.fullname}>
                            <User
                              name={student.fullname}
                              avatarProps={{
                                src: student.image,
                              }}
                            />
                          </li>
                        ))
                    ) : (
                      <li className="p-5">No teachers available</li>
                    )}
                    <h1 className="font-bold">Students</h1>
                    {participants.length > 0 ? (
                      participants
                        .filter((item) => item.role === "student")
                        .map((student) => (
                          <li className="p-5" key={student.fullname}>
                            <User
                              name={student.fullname}
                              avatarProps={{
                                src: student.image,
                              }}
                            />
                          </li>
                        ))
                    ) : (
                      <li className="border-b p-5">No students available</li>
                    )}
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default CoursesInfo;
