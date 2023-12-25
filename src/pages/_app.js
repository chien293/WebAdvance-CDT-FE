import "@/styles/globals.css";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ClassProvider } from "@/components/ClassProvider";

export default function App({ Component, pageProps }) {
  return (
    <ClassProvider>
      <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="dark">

          <Component {...pageProps} />

        </NextThemesProvider>
      </NextUIProvider>
    </ClassProvider>
  );
}
