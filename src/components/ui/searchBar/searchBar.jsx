import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import SearchIcon from "@/assets/searchIcon";

export default function searchBar({
  label,
  placeholder,
  onSearch,
  initialValue,
}) {
  const [search, setSearch] = useState(initialValue || "");

  return (
    <div>
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
