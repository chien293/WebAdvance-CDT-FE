import React from "react";
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
import {
  TwitterIcon,
  DiscordIcon,
  GithubIcon,
  AcmeLogo,
  SearchIcon,
} from "./Icons.jsx";
import NextLink from "next/link";
import { link as linkStyles } from "@nextui-org/theme";
import { siteConfig } from "../../config/site.js";
import { SwitchTheme } from "./switch-theme/SwitchTheme.jsx";
import clsx from "clsx";

export const Nav = () => {
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}></Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

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
            <AcmeLogo />
            <p className="font-bold text-inherit mb-0">ACME</p>
          </NextLink>
        </NavbarBrand>
        <div className=" hidden lg:flex gap-4 justify-start ml-2">
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
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal href={siteConfig.links.twitter}>
            <TwitterIcon className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.discord}>
            <DiscordIcon className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link>
          <SwitchTheme />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        <SwitchTheme />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="basis-1 pl-4" justify="end">
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>

        <NavbarItem className="md:flex">
          <Link href="/auth/SignIn" className="text-base text-default-500">
            Login
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button
            className="text-base text-default-500"
            as={Link}
            href="/auth/SignUp"
            variant="flat"
          >
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
