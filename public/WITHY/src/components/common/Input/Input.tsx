"use client";

import { twMerge } from "tailwind-merge";

interface CommonInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ label, error, className, ...props }: CommonInputProps) {
  return (
    <input
      className={twMerge(
        "w-full text-black border border-gray-300 p-3 pr-12 rounded-2xl outline-none focus:border-gray-900",
        className
      )}
      {...props}
    />
  );
}