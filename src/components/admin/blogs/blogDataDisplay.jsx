"use client";
import React, { useCallback, useEffect, useReducer } from "react";
import { Input, Button } from "@nextui-org/react";
import SearchIcon from "@/assets/searchIcon";
import AddIcon from "@/assets/addIcon";
import { useRouter } from "next/navigation";
import { getBlogCount } from "@/utils/countersAPI";

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
    case "blogs":
      return {
        ...state,
        blogs: action.value,
      };
    case "limitPerPage":
      return {
        ...state,
        limitPerPage: action.value,
      };
    case "currentPage":
      return {
        ...state,
        currentPage: action.value,
      };
    case "totalPage":
      return {
        ...state,
        totalPage: action.value,
      };
  }
};

export default function BlogDataDisplay() {
  const [blogReducer, blogDispatch] = useReducer(reducer, {
    search: {
      searchInput: "",
      isLoading: false,
    },
    blogs: [],
    limitPerPage: 10,
    currentPage: 1,
    totalPage: 1,
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
  }, [router]);

  const getBlogTotalCount = useCallback(async () => {
    const count = await getBlogCount();
    blogDispatch
  }, []);

  useEffect(() => {}, []);

  return (
    <>
      <h1 className="mb-4 text-xl md:text-3xl">Blog Pages</h1>
      <div className="flex items-center justify-center w-full gap-2">
        <form className="flex items-center justify-center w-full gap-2">
          <Input
            label="Search Blogs"
            value={blogReducer.search.searchInput}
            onValueChange={(value) =>
              blogDispatch({ type: "searchInput", value })
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

      <div className="mt-4">
        
      </div>

      <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Blog Data Display */}
        <div className="min-h-[50px] bg-slate-500">col-1</div>
        <div className="min-h-[50px] bg-slate-500">col-2</div>
        <div className="min-h-[50px] bg-slate-500">col-3</div>
        <div className="min-h-[50px] bg-slate-500 lg:col-span-3">col-4</div>
      </div>
    </>
  );
}
