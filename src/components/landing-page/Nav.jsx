import React, { useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  Input,
  Kbd,
} from "@nextui-org/react";
import { Logo } from "./Icons.jsx";
import NextLink from "next/link";
import LinkNext from "next/link";
import { link as linkStyles } from "@nextui-org/theme";
import { siteConfig } from "../../config/site.js";
import { SwitchTheme } from "./switch-theme/SwitchTheme.jsx";
import clsx from "clsx";
import { User } from "@nextui-org/react";
import { set } from "react-hook-form";
import authService from "@/auth/auth-service.js";
export const Nav = () => {
  const [currentUser, setCurrentUser] = React.useState(null);
  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user.user[0]);
    }
  }, []);
  return (
    <Navbar
      isBordered
      maxWidth="xl"
      position="sticky"
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-primary",
        ],
      }}
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <NextLink
            className="flex justify-start items-center gap-1 no-underline"
            href="/"
          >
            <Logo />
            <p className="font-bold text-inherit mb-0">CDT</p>
          </NextLink>
        </NavbarBrand>
        {/* <div className=" hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </div> */}
      </NavbarContent>

      {/* <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <SwitchTheme />
        </NavbarItem>
      </NavbarContent> */}
      {/* <NavbarContent className="basis-1 pl-4" justify="center">
        <div className=" hidden lg:flex gap-6 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent> */}
      <NavbarContent className="basis-1 pl-4" justify="end">
        {!currentUser ? (
          <>
            <NavbarItem className="md:flex">
              <LinkNext
                href="/auth/sign-in"
                className="text-base text-default-500"
              >
                Login
              </LinkNext>
            </NavbarItem>
            <NavbarItem>
              <Button
                className="text-base text-default-500"
                as={LinkNext}
                href="/auth/sign-up"
                variant="flat"
              >
                Sign Up
              </Button>
            </NavbarItem>
          </>
        ) : (
          <NavbarItem>
            <User
              name={currentUser.fullname}
              avatarProps={{
                src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
              }}
            />
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
};
