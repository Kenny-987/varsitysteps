import React from 'react'
import CookieConsent from 'react-cookie-consent';
import Link from 'next/link';

const CookieConsentPopup = () => {
    return (
        <CookieConsent
          location="bottom"
          buttonText="Got it!"
          cookieName="userCookieConsent"
          style={{
            background: "#2B373B",
            color: "#fff",
            fontSize: "14px",
            textAlign: "center",
          }}
          buttonStyle={{
            background: "#f1d600",
            color: "#000",
            fontSize: "14px",
            borderRadius: "5px",
            padding: "10px 20px",
          }}
          expires={365}
        >
          This website uses cookies to enhance the user experience. By using this website, you agree to our cookie policy. Read more in our 
           <Link style={{color:"#f1d600"}} href='/terms-and-conditions'>Terms and Conditions</Link> page.
        </CookieConsent>
      );
}

export default CookieConsentPopup