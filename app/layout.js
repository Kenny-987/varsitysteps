"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Navbar from "./components/navbar/Navbar";
import { ContextProvider } from "./hooks/Context";
import React, {useEffect} from 'react'
import { SocketProvider, useSocket } from "./hooks/SocketContext";
import Footer from "./components/footer/Footer";
import Script from "next/script";
import AchievementPopup from "./components/achievement/page";
import { useContextUser } from "./hooks/Context";
import Announcements from "./components/announcements/Announcements";
import CookieConsentPopup from "./components/cookieconsent/CookieConsent";
import IncomingCall from "./components/incomingCall/IncomingCall";
config.autoAddCss = false;
const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "VarsitySteps",
//   description: "Empowering your academic journey",
// };


export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
       <head>
         {/* Add Google Analytics */}
         <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-KTMXPXCGYV`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-KTMXPXCGYV', { page_path: window.location.pathname });
            `,
          }}
        />

        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>VarsitySteps</title>
        <meta name="description" content="VarsitySteps - Empowering your academic journey" />
        <meta name="keywords" content="tutors, zimbabwean tutors, online learning education, tutors in zimbabwe, varsitysteps, varsity steps, varsity steps zimbabawe, tutors, quizzes, quiz, zimbabwe, edtech, zimbabwe edtech, online tutors"/>
        <meta name="google-site-verification" content="fMW3BqKc0Ey8Fkh-h3XYLIII87T08fonaxx6L3LBrXE" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <meta name="google-adsense-account" content="ca-pub-5395588748904287"/>
       
      </head>
      <body >
        <SocketProvider>
       <ContextProvider>
      <ContentWrapper>{children}</ContentWrapper>
        </ContextProvider>
        </SocketProvider>
        </body>
    </html>
  );
}

function ContentWrapper({ children }) {
  const { showAchPopup} = useContextUser();
  const socket = useSocket()
  const {userData}=useContextUser()

  let userId
  if(userData){
    userId = userData.id

  }
  useEffect(() => {
    if (userId) {
      socket.emit('register', { userId });
    }
  }, [userId]);
  return (
    <>
      <Navbar />
      <IncomingCall/>
      {/* <Announcements/> */}
      {showAchPopup && <AchievementPopup />}
      {children}
      <CookieConsentPopup/>
      <Footer />
    </>
  );
}