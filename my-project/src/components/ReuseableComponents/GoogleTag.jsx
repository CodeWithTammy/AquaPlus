import { useEffect } from "react";

const GoogleTag = ({ tagId }) => {
  useEffect(() => {

    if(!tagId) {
      console.warn("Google Tag ID is missing. Please provide a valid tag ID.");
      return;
    }

    //load google tag script
    const script1 = document.createElement("script");
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${tagId}`;
    script1.async = true;
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '${tagId}',{
        debug_mode: true});
    `;
    document.head.appendChild(script2);

    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, [tagId]);

  return null;
};

export default GoogleTag;
