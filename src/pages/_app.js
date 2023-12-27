import "@/styles/globals.css";
import React, { useEffect, useState } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ClassProvider } from "@/components/ClassProvider";
import { SocketProvider } from "@/components/SocketProvider";

export default function App({ Component, pageProps }) {
  return (
    <SocketProvider>
      <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="dark">

          <ClassProvider>
            <Component {...pageProps} />
          </ClassProvider>

        </NextThemesProvider>
      </NextUIProvider>
    </SocketProvider>
  );
}
