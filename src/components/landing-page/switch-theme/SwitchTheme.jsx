import { Switch } from "@nextui-org/react";
import { MoonIcon } from "./MoonIcon";
import { SunIcon } from "./SunIcon";
import React from "react";
import { useTheme } from "next-themes";

export default function SwitchTheme() {
  const [isDarkMode, setDarkMode] = React.useState(false);
  const { theme, setTheme } = useTheme();
  if (isDarkMode) {
    setTheme("dark");
  } else {
    setTheme("light");
  }
  return (
    <Switch
      isSelected={isDarkMode}
      onValueChange={setDarkMode}
      defaultSelected
      size="lg"
      color="warning"
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <SunIcon className={className} />
        ) : (
          <MoonIcon className={className} />
        )
      }
    ></Switch>
  );
}
