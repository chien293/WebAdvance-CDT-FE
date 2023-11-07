"use client";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import SignIn from "./auth/SignIn";
import Nav from "@/components/landing-page/Nav";
import MainContent from "@/components/landing-page/MainContent";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Nav></Nav>
      <MainContent></MainContent>
      {/* <SignIn /> */}
    </>
  );
}
