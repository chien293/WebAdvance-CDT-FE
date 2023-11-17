import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import DropdownItem from "./DropdownItem";

const AvatarDropdown = ({ user }) => {
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    authService.logout();
    router.push({ pathname: "/" });
  };

  const closeDropdown = () => {
    setOpen(false);
  };

//   const dropdownStyle = {
//     position: "absolute",
//     top: avatarRef.current.offsetTop + avatarRef.current.offsetHeight,
//     left: avatarRef.current.offsetLeft,
//   };

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
    <div>
      <div
        onClick={() => {
          setOpen(!open);
        }}>
        <img
          id="avatarButton"
          type="button"
          data-dropdown-toggle="userDropdown"
          data-dropdown-placement="bottom-start"
          class="relative inline-block h-12 w-12 rounded-full border-2 border-white object-cover object-center hover:z-10 focus:z-10 cursor-pointer"
          src="https://cdnphoto.dantri.com.vn/COm1qksauO2sqAC-gVVI2DdH_1I=/thumb_w/1020/2023/01/24/khoa-hocdocx-1674520013659.png"
          alt="User dropdown"
        />
      </div>
      {open && (
        <div
          id="userDropdown"
          class="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
          <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div>Full name</div>
            <div class="font-medium truncate">email</div>
          </div>
          <ul
            class="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="avatarButton">
            <DropdownItem href="/home-page" title="Dashboard" />
            <DropdownItem href="/settings" title="Settings" />
            <DropdownItem href="/profile" title="Edit Profile" />
          </ul>   
          <Button onClick={handleLogout}>Logout</Button>   
        </div>
      )}
    </div>
  );
};

export default AvatarDropdown;
