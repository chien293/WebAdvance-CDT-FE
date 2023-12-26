import Blogs from "@/components/landing-page/blog/Blogs";
import Hero from "@/components/landing-page/Hero";
import DefaultLayout from "@/layouts/default";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AuthService from "@/auth/auth-service";
function Home() {
  const router = useRouter();
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      router.push("/home-page");
    }
  }, []);

  return (
    <DefaultLayout>
      <Hero />
      {/* <Blogs /> */}
    </DefaultLayout>
  );
}
export default Home;
