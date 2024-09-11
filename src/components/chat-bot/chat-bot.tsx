"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    voiceflow: any;
  }
}

const Chatbot = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;

    script.onload = function () {
      window.voiceflow.chat.load({
        verify: { projectID: "66e03553bbe9475a1ee781f2" },
        url: "https://general-runtime.voiceflow.com",
        versionID: "production",
      });
    };

    script.src = "https://cdn.voiceflow.com/widget/bundle.mjs";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default Chatbot;
