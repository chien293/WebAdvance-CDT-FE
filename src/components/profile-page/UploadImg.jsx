import { useEffect, useState, useRef } from "react";
import { Button, user } from "@nextui-org/react";
import userService from "@/service/user/userService";
export default function Home(props) {
  const fileInputRef = useRef(null);

  async function handleOnChange(changeEvent) {
    const reader = new FileReader();
    reader.readAsDataURL(changeEvent.target.files[0]);
    props.setIsLoading(true);
    await handleOnSubmit(changeEvent); // Pass changeEvent instead of event
  }
  async function handleOnSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const fileInput =
      form.elements &&
      Array.from(form.elements).find(({ name }) => name === "file");
    if (fileInput) {
      const formData = new FormData();
      for (const file of fileInput.files) {
        formData.append("file", file);
      }
      formData.append("upload_preset", "fxwqzera");
      const data = await fetch(
        "https://api.cloudinary.com/v1_1/dmbwhnml9/image/upload",
        {
          method: "POST",
          body: formData,
        }
      ).then((r) => r.json());
      await userService.updateUserImage(props.userId, data.secure_url);
      props.setImageSrc(data.secure_url);
      props.setOpen(false);
      props.setIsLoading(false);
    }
  }

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="size-full flex justify-center">
      <form
        className="size-full"
        method="post"
        onChange={handleOnChange}
        onSubmit={handleOnSubmit}
      >
        <p className="hidden">
          <input type="file" name="file" ref={fileInputRef} />
        </p>
        <Button
          variant="light"
          className="size-full font-semibold text-blue-600/100"
          onClick={handleUploadButtonClick}
        >
          Upload Photo
        </Button>
      </form>
    </div>
  );
}
