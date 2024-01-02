import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import DropdownItem from "./DropdownItem";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import authService from "@/auth/auth-service";
import { useRouter } from "next/navigation";
import { useSocket } from "./SocketProvider";
const AvatarDropdown = ({ user, id, img }) => {
  const socket = useSocket();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handleLogout = () => {
    authService.logout();
    socket.disconnect();
    router.push({ pathname: "/auth/sign-in" });
  };

  const closeDropdown = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleWindowResize = () => {
      closeDropdown();
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <div className="relative">
      <div
        onClick={() => {
          setOpen(!open);
        }}
      >
        <img
          className="relative inline-block h-12 w-12 rounded-full border-2 border-white object-cover object-center hover:z-10 focus:z-10 cursor-pointer"
          src={img}
          alt="User dropdown"
        />
      </div>
      {open && (
        <div className="z-10 absolute divide-y divide-gray-700 rounded-lg shadow-2xl w-44 bg-white dark:bg-black origin-top-right -translate-x-32">
          <div className="px-4 py-3 text-sm">
            <div className="font-bold text-xl">{user}</div>
          </div>
          <ul className="py-2 text-sm">
            <DropdownItem
              // icon={ClassOutlinedIcon}
              href="/home-page"
              title="Dashboard"
            />
            <DropdownItem
              // icon={ClassOutlinedIcon}
              href="/settings"
              title="Settings"
            />
            <DropdownItem
              // icon={ClassOutlinedIcon}
              href="/profile"
              title="Edit Profile"
            />
          </ul>
          <Button className="w-full" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      )}
    </div>
  );
};

export default AvatarDropdown;
