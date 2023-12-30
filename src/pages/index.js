import Blogs from "@/components/landing-page/blog/Blogs";
import Hero from "@/components/landing-page/Hero";
import DefaultLayout from "@/layouts/default";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AuthService from "@/auth/auth-service";
import Loading from "@/components/Loading";
function Home() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setIsLogin(true);
      router.push("/home-page");
    }
  }, []);

  return (
    <>
      {!isLogin ? (
        <DefaultLayout>
          <Hero />
        </DefaultLayout>
      ) : (
        <Loading />
      )}
    </>
  );
}
export default Home;
