import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import SearchIcon from "@/assets/searchIcon";

export default function SearchBar({
  label,
  placeholder,
  onSearch,
  initialValue,
  className,
  ...props
}) {
  const [search, setSearch] = useState(initialValue || "");

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <Input
        label={label || null}
        placeholder={placeholder || null}
        onValueChange={(value) => setSearch(value)}
        value={search}
      />
      <Button 
        isIconOnly
        isDisabled={!search}
        onClick={() => onSearch(search)}
      >
        <SearchIcon />
      </Button>
    </div>
  );
}
