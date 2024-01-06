import classService from "@/service/class/classService";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  CircularProgress,
} from "@nextui-org/react";
import { is } from "date-fns/locale";
import React from "react";
import { IoMdAdd, IoMailOutline } from "react-icons/io";
const InviteMailForm = ({ role, classId, notify }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const isValidEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  const handleClick = async () => {
    if (!isValidEmail(email)) {
      alert("Email is invalid");
    }
    const checkUserInClass = await classService.checkUserInClass(
      email,
      classId
    );
    if (checkUserInClass) {
      alert("User already in class");
    } else {
      setLoading(true);
      const res = await classService.inviteByEmail(email, classId, role);

      setLoading(false);
      onOpenChange(false);
      notify("Invite sent");
    }
  };

  const handleEmailChange = (event) => {
    // Add this function
    setEmail(event.target.value);
  };

  return (
    <>
      <Button
        className="justify-self-end"
        isIconOnly
        variant="light"
        onPress={onOpen}
      >
        <IoMdAdd />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add {role} to class
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Email"
                  placeholder="Enter email"
                  variant="bordered"
                  value={email} // Add this line
                  onChange={handleEmailChange} // Add this line
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  isDisabled={loading}
                  color="primary"
                  onClick={handleClick}
                >
                  Send invite
                  {loading ? <CircularProgress size="sm" /> : <></>}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default InviteMailForm;
