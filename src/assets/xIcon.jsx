import React from "react";

export default function XIcon({
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
      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
    </svg>
  );
}
