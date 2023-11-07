"use client";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import SignIn from "./auth/SignIn";
import Nav from "@/components/landing-page/Nav";
import SwitchTheme from "@/components/landing-page/switch-theme/SwitchTheme";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Nav></Nav>
      {/* <SignIn /> */}
    </>
  );
}
