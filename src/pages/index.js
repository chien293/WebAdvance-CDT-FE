import Blogs from "@/components/landing-page/blog/Blogs";
import Hero from "@/components/landing-page/Hero";
import DefaultLayout from "@/layouts/default";

export default function Home() {
  return (
    <DefaultLayout>
      <Hero />
      <Blogs />
    </DefaultLayout>
  );
}
