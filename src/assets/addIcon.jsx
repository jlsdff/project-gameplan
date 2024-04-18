import React from "react";

export default function AddIcon({
  fill = "currentColor",
  filled,
  size,
  height,
  width,
  label,
  ...props
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      fill={filled ? fill : "currentColor"}
      width={size || width || height || 24}
      height={size || height || width || 24}
      {...props}
    >
      <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
    </svg>
  );
}
