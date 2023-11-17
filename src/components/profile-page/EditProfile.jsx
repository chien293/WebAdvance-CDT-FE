import { useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import { FaPhoneAlt } from "react-icons/fa";
import axios from "axios";
import clsx from "clsx";
import authService from "@/auth/auth-service";

function EditProfile({ user, onCancelClick, onUpdateData }) {
  const [name, setName] = useState(user.fullname);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState(user.email);
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");
  const id = user.id;
  const handleSave = async () => {
    const user1 = await authService.getCurrentUser();

    // handle save logic here
    await axios
      .post(
        "http://localhost:5000/" + "update",
        {
          id: id,
          name: name,
          email: email,
          avatar: "",
        },
        {
          headers: {
            token: "Bearer " + user1.accessToken,
          },
        }
      )
      .catch(function (error) {
        console.log(error);
      });

    onUpdateData();
    onCancelClick();
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-64 h-64 rounded-full overflow-hidden">
        <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setAvatar(URL.createObjectURL(e.target.files[0]))}
        className="mt-4"
      />
      <label className="block mt-4">
        <span class="block text-sm font-medium text-slate-700">Name</span>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md"
        />
        {name === "" ? (
          <div className="rounded border border-red-600 bg-red-50 p-1 mt-1 text-red-600">
            Please fill your name
          </div>
        ) : (
          <div className="hidden"></div>
        )}
      </label>

      {/* <label className="block mt-4">
        <span class="block text-sm font-medium text-slate-700">Phone</span>
        <FaPhoneAlt />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md"
        />
      </label> */}

      <label className="block mt-4">
        <span class="block text-sm font-medium text-slate-700">Email</span>
        {/* <AiOutlineMail /> */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md"
        />
        {email === "" ? (
          <div className="rounded border border-red-600 bg-red-50 p-1 mt-1 text-red-600">
            Please fill your email
          </div>
        ) : (
          <div className="hidden"></div>
        )}
      </label>
      {/* <label className="block mt-4">
        <span class="text-sm font-medium text-slate-700">Address</span>
        <IoLocationOutline />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md"
        />
      </label> */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={handleSave}
          className="disabled:opacity-75 mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Save
        </button>
        <button onClick={onCancelClick}>Cancel</button>
      </div>
    </div>
  );
}

export default EditProfile;
