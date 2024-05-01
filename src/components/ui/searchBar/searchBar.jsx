"use client";
import React, { useCallback, useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import SearchIcon from "@/assets/searchIcon";

export default function SearchBarClient({
  label,
  placeholder,
  classNames,
  searchUrl,
  initialValue,
  inputProps,
  buttonProps,
}) {
  const router = useRouter();
  const [search, setSearch] = useState(initialValue || "");

  const onSubmit = useCallback(() => {
    router.push(`${searchUrl}${search}`);
    console.log(`${searchUrl}${search}`)
  }, [search, router, searchUrl]);

  return (
    <form
      className={`flex items-center justify-center gap-2 ${
        classNames?.container || ""
      }`}
    >
      <Input
        className={`w-full ${classNames?.input || ""}`}
        label={label || null}
        placeholder={placeholder || null}
        onValueChange={(value) => setSearch(value)}
        value={search}
        {...inputProps}
      />
      <Button
        className={`${classNames?.button || ""}`}
        isIconOnly
        isDisabled={!search}
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          onSubmit(search);
        }}
        {...buttonProps}
      >
        <SearchIcon />
      </Button>
    </form>
  );
}
