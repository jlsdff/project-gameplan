"use client";
import React, { useCallback, useReducer } from "react";
import { Input, Button } from "@nextui-org/react";
import SearchIcon from "@/assets/searchIcon";
import AddIcon from "@/assets/addIcon";
import { useRouter } from "next/navigation";

const reducer = (state, action) => {
  switch (action.type) {
    case "searchInput":
      return {
        ...state,
        search: {
          ...state.search,
          searchInput: action.value,
        },
      };
  }
};

export default function BlogDataDisplay() {
  const [blogReducer, blogDispatcch] = useReducer(reducer, {
    search: {
      searchInput: "",
      isLoading: false,
    },
  });
  const router = useRouter();

  const handleSearchBlogs = useCallback(
    (e) => {
      e.preventDefault();
      console.log(blogReducer.search.searchInput);
    },
    [blogReducer.search.searchInput]
  );

  const handleNewBlog = useCallback(() => {
    router.push("/admin/dashboard/blogs/new");
  });

  return (
    <>
      <h1 className="mb-4 text-xl md:text-3xl">Blog Pages</h1>
      <div className="flex items-center justify-center w-full gap-2">
        <form className="flex items-center justify-center w-full gap-2">
          <Input
            label="Search Blogs"
            value={blogReducer.search.searchInput}
            onValueChange={(value) =>
              blogDispatcch({ type: "searchInput", value })
            }
          />
          <Button
            variant="solid"
            color="primary"
            size="sm"
            isLoading={blogReducer.search.isLoading}
            onClick={(e) => {
              handleSearchBlogs(e);
            }}
            aria-label="Search Blogs"
            isIconOnly
            type="submit"
            isDisabled={!blogReducer.search.searchInput}
          >
            <SearchIcon />
          </Button>
        </form>
        <Button
          variant="light"
          color="primary"
          size="sm"
          isIconOnly
          aria-label="New Blog"
          onClick={() => handleNewBlog()}
        >
          <AddIcon />
        </Button>
      </div>
    </>
  );
}
