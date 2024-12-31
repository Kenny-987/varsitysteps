"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Navbar from "./components/navbar/Navbar";
import { ContextProvider } from "./hooks/Context";
import React, {useState} from 'react'
import { SocketProvider } from "./hooks/SocketContext";
import Footer from "./components/footer/Footer";


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
        <meta name="description" content="VarsitySteps - Empowering your academic journey" />
        <meta name="keywords" content="Tutors, Zimbabwean Tutors, online learning education, tutors in zimbabwe"/>
        <meta name="google-site-verification" content="jUKToN8lga2gYvjqneGTHsgltCGD1A-8NZGp5NcznCE" />
      </head>
      <body >
        <SocketProvider>
       <ContextProvider>
      <Navbar/>
        {children}
        </ContextProvider>
        </SocketProvider>
        </body>
    </html>
  );
}
