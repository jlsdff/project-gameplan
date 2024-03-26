import React from "react";

export default function CheckIcon({
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
      <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
    </svg>
  );
}
