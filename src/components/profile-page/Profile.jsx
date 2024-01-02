import { Upload } from "@mui/icons-material";
import React from "react";
import UploadImg from "./UploadImg";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  CircularProgress,
  Input,
} from "@nextui-org/react";
import userService from "@/service/user/userService";
import { set } from "date-fns";
import authService from "@/auth/auth-service";

const ProfileBox = ({ user, onEditClick, updateSharedState }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isChange, setIsChange] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(user);
  const [imageSrc, setImageSrc] = React.useState(user.image);
  React.useEffect(() => {
    const fetchUser = async () => {
      const res = await userService.getUserInfo(user.id);
      updateSharedState(res);
      setCurrentUser(res);
      setImageSrc(res.image);
      const accessToken = authService.getAccessToken();
      const data = {
        user: [res],
        accessToken,
      };
      localStorage.setItem("user", JSON.stringify(data));
    };
    fetchUser();
    console.log("fetch user");
  }, [imageSrc]);
  return (
    <div class="md:flex no-wrap p-5">
      {/* left side */}
      <div class="w-full md:w-1/5 md:mx-2 grid grid-cols-1">
        <div class="bg-white p-3 flex justify-center">
          <div className="flex flex-wrap gap-4">
            <Popover
              key="transparent"
              showArrow
              offset={10}
              placement="bottom"
              backdrop="transparent"
              isOpen={isOpen}
              onOpenChange={(open) => setIsOpen(open)}
            >
              <PopoverTrigger>
                <Button className="relative w-40 h-40">
                  {isLoading && (
                    <div className="absolute inset-0 flex justify-center items-center">
                      <CircularProgress
                        color="default"
                        aria-label="Loading..."
                      />
                    </div>
                  )}
                  <img
                    src={imageSrc}
                    className=" max-h-40 h-auto max-w-40 w-auto"
                  ></img>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[240px]">
                <UploadImg
                  setOpen={setIsOpen}
                  setImageSrc={setImageSrc}
                  setIsLoading={setIsLoading}
                  userId={user.id}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div class="bg-white p-3 flex justify-center">
          <div class="image overflow-hidden">
            <img
              class="h-auto w-full mx-auto"
              src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
              alt=""
            ></img>
          </div>
          <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">
            {user.fullname}
          </h1>

          {/* <ul class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
            <li class="flex items-center py-3">
              <span>Status</span>
              <span class="ml-auto">
                {user.active === 1 ? (
                  <span class="bg-green-500 py-1 px-2 rounded text-white text-sm">
                    Active
                  </span>
                ) : (
                  <span class="bg-red-500 py-1 px-2 rounded text-white text-sm">
                    Inactive
                  </span>
                )}
              </span>
            </li>
            <li class="flex items-center py-3">
                <span>Member since</span>
                <span class="ml-auto">Nov 07, 2016</span>
              </li>
          </ul> */}
        </div>
        <div class="my-4"></div>
      </div>
      <div class="w-full md:w-4/5 mx-2 h-64">
        {/* About */}
        <div class="bg-white p-3 shadow-sm rounded-sm">
          <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
            <span clas="text-green-500">
              <svg
                class="h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </span>
            <span class="tracking-wide">About</span>
          </div>
          <div class="text-gray-700">
            <div class="grid md:grid-cols-1 text-md">
              <div class="grid grid-cols-2">
                <div class="px-4 py-2 font-semibold">Full Name</div>
                <div class="px-4 py-2">{user.fullname}</div>
              </div>
              <div class="grid grid-cols-2">
                <div class="px-4 py-2 font-semibold">Email</div>
                <div class="px-4 py-2">
                  <a class="text-blue-800" href="mailto:jane@example.com">
                    {user.email}
                  </a>
                </div>
              </div>
              <div class="grid grid-cols-2">
                <div class="px-4 py-2 font-semibold">Birthday</div>
                <div class="px-4 py-2">{user.birthday || "None"}</div>
              </div>
            </div>
          </div>
          <div class="flex justify-center">
            <button class="justify-self-center block w-auto text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
              Edit
            </button>
          </div>
        </div>

        <div class="my-4"></div>
      </div>
    </div>
  );
};

export default ProfileBox;
