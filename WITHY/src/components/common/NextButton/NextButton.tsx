"use client";

import { useState } from "react";
import { useGuardedRouter } from "@/hooks/useGuardedRouter";
import { twMerge } from "tailwind-merge";
import LeavePartyModal from "@/components/home/LeavePartyModal/LeavePartyModal";

interface CommonButtonProps {
  text: React.ReactNode;
  href?: string;
  type?: "button" | "submit";
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => void;
  flickerOnClick?: boolean; // New prop to enable flicker animation
  flickerColor?: "red" | "white"; // New prop for color
  disabled?: boolean;
}

export default function NextButton({
  text,
  onClick,
  href,
  type = "submit",
  className = "",
  flickerOnClick = false,
  flickerColor = "red"
}: CommonButtonProps) {
  const router = useGuardedRouter();
  const [isFlickering, setIsFlickering] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (flickerOnClick) {
      e.preventDefault(); // Prevent immediate submission/navigation
      setIsFlickering(true);

      // Delay action to let animation play (2s)
      setTimeout(() => {
        setIsFlickering(false); // Stop flickering (optional, but clean)
        if (onClick) {
          onClick(e);
        }
        if (href && type === "button" && !onClick) {
          router.push(href);
        }
      }, 2000);
      return;
    }

    if (onClick) {
      onClick(e);
    }
    if (href && type === "button" && !onClick) {
      router.push(href);
    }
  };

  const flickerClass = flickerColor === "white"
    ? "animate-white-neon-infinite"
    : "animate-red-neon-infinite";

  return (
    <>
      <button
        type={type}
        onClick={handleClick}
        // 2. twMerge로 감싸서 중복 스타일 제거
        className={twMerge(
          "w-full py-3 rounded-2xl bg-gray-900 text-white font-semibold hover:bg-gray-800 active:scale-98 transition-all flex items-center justify-center gap-3",
          isFlickering ? flickerClass : "", // Apply determined infinite flicker class
          className
        )}
      >
        {text}
      </button>

      {/* Navigation Guard Modal */}
      {router.isModalOpen && (
        <LeavePartyModal
          onClose={router.handleModalClose}
          onConfirm={router.handleLeaveConfirm}
          isPending={router.isPending}
        />
      )}
    </>
  );
}