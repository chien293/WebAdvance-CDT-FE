import React from "react";
import { Input, Textarea, Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import ClassService from "@/service/class/classService";
import authService from "@/auth/auth-service";
const SettingsContent = (props) => {
  const variant = "bordered";
  const {
    register,
    // watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [isChange, setIsChange] = React.useState(false);
  const [reload, setReload] = React.useState(false);
  console.log(props.classId);
  // handle disable save button
  // React.useEffect(() => {
  //   const subscription = watch((value, { name, type }) => {
  //     console.log(value, name, type);
  //     setIsChange(true);
  //   });
  //   return () => subscription.unsubscribe();
  // }, [watch]);

  React.useEffect(() => {
    async function fetchData() {
      const res = await ClassService.getClassInfo(props.classId);
      setValue("className", res[0].name);
      setValue("title", res[0].title);
      setValue("topic", res[0].topic);
      setValue("room", res[0].room);
      setValue("description", res[0].description);
    }
    fetchData();
    console.log("reload");
  }, [setValue, reload]);
  //handle save settings data
  const onSubmit = async (data) => {
    const res = await ClassService.updateClassInfo(props.classId, data);
    if (res) {
      setReload(!reload);
      setIsChange(false);
    }
  };

  return (
    <div className="container mx-auto grid grid-cols-1 divide-y">
      <div className="grid grid-cols-1">
        <h2 className="text-2xl font-bold mb-4">Class information</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 grid-cols-1">
            <Input
              isRequired
              type="text"
              variant={variant}
              label="Class name"
              placeholder="Enter class name"
              onValueChange={() => setIsChange(true)}
              {...register("className")}
            />
            <Input
              type="text"
              variant={variant}
              label="Title"
              placeholder="Enter title"
              onValueChange={() => setIsChange(true)}
              {...register("title")}
            />
            <Input
              type="text"
              variant={variant}
              label="Topic"
              placeholder="Enter topic"
              onValueChange={() => setIsChange(true)}
              {...register("topic")}
            />
            <Input
              type="text"
              variant={variant}
              label="Room"
              placeholder="Enter room"
              onValueChange={() => setIsChange(true)}
              {...register("room")}
            />
            <Textarea
              variant={variant}
              label="Description"
              placeholder="Enter description"
              onValueChange={() => setIsChange(true)}
              {...register("description")}
            />
            <Button
              className="w-auto justify-self-end"
              type="submit"
              isDisabled={isChange ? false : true}
              color="primary"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
      <div>
        <h2 className="text-2xl font-bold">Invitation</h2>
      </div>
    </div>
  );
};

export default SettingsContent;
