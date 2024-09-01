"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
export default function ScrollButton() {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 p-3 rounded-full bg-orange-300 hover:bg-orange-400 text-white shadow-lg focus:outline-none"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </>
  );
}
