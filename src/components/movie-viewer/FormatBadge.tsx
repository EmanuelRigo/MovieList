"use client";

import React from "react";

interface FormatBadgeProps {
  active: boolean;
  title: string;
  icon: React.ReactNode;
  label: string;
}

const FormatBadge: React.FC<FormatBadgeProps> = ({
  active,
  title,
  icon,
  label,
}) => {
  return (
    <div
      className={`
        flex
        flex-1
        flex-col
        items-center
        justify-center
        gap-0.5
        rounded-xl
        border
        px-0
        py-1.5
        
        md:text-xs
        font-semibold
        transition
        ${
          active
            ? "border-yellow-500 bg-yellow-500 text-neutral-800"
            : "border-neutral-700 bg-neutral-700 text-neutral-400"
        }
      `}
      title={title}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
};

export default FormatBadge;
