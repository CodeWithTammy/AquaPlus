import { useEffect } from "react";

const GoogleTag = ({ tagId, nonce }) => {
  useEffect(() => {
    // Load external GA script
    const script1 = document.createElement("script");
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${tagId}`;
    if (nonce) script1.nonce = nonce; // <-- add nonce
    document.head.appendChild(script1);

    // Inline script for GA configuration
    const script2 = document.createElement("script");
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${tagId}');
    `;
    if (nonce) script2.nonce = nonce; // <-- add nonce
    document.head.appendChild(script2);

    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, [tagId, nonce]);

  return null;
};

export default GoogleTag;