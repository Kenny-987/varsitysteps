"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Navbar from "./components/navbar/Navbar";
import { DashContextProvider } from "./context/dashContext";
import React, {useState} from 'react'
// import { SessionProvider } from "next-auth/react";


config.autoAddCss = false;
const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "VarsitySteps",
//   description: "Empowering your academic journey",
// };


export default function RootLayout({ children }) {
  const [showDash,setShowdash] = useState(false)
  return (
    <html lang="en">
       <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>VarsitySteps</title>
        <meta name="description" content="Empowering your academic journey" />
      </head>
      <body className={inter.className}>
       <DashContextProvider>
      <Navbar/>
        {children}
        </DashContextProvider>
        </body>
    </html>
  );
}
