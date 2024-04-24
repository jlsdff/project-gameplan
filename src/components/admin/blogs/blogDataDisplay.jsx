"use client";
import React, { useState, useCallback, useEffect, useReducer } from "react";
import {
  Input,
  Button,
} from "@nextui-org/react";
import SearchIcon from "@/assets/searchIcon";
import AddIcon from "@/assets/addIcon";
import { useRouter } from "next/navigation";
import { getBlogCount } from "@/utils/countersAPI";
import BlogContainer from "./blogContainer";
import { getBlogsByPage, deleteBlog } from "@/utils/blogsAPI";

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
    case "activeDeleteId":
      return {
        ...state,
        activeDeleteId: action.value,
      };
    case 'loadStatus':
      return {
        ...state,
        loadStatus: action.value
      }
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
    activeDeleteId: null,
    loadStatus: {
      isDisabled: false,
      isLoading: false,
    }
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

  const handleEditBlog = useCallback((id) => {
    router.push(`/admin/dashboard/blogs/new?id=${id}`);
  },[router])

  const handleDeleteBlog = useCallback((id) => {
    const shouldDelete = confirm("Are you sure you want to delete this blog?")
    
    if(shouldDelete){
      deleteBlog(id).then( res => {
        alert("Blog Deleted Successfully");
        getBlogsByPage(6)
          .then((res) => {
            console.log(res);
            blogDispatch({ type: "blogs", value: res.docs });
          })
          .catch((error) => {
            alert("Error fetching blogs");
            console.error(error);
          });
      }).catch(error => {
        alert("Error deleting blog");
        console.error(error)
      })
    }else {
      console.log("Canceling delete");
    }
    
  },[])

  useEffect(() => {
    getBlogsByPage(6)
      .then((res) => {
        console.log(res);
        blogDispatch({ type: "blogs", value: res.docs });
      })
      .catch((error) => {
        alert("Error fetching blogs");
        console.error(error);
      });
  }, []);


  const fetchMoreBlogs = useCallback(async () => {
    blogDispatch({type: 'loadStatus', value: {isLoading: true, isDisabled: false}})
    blogDispatch({type: 'totalPage', value: blogReducer.totalPage + 1})
    const lastSnapshot = blogReducer.blogs[blogReducer.blogs.length - 1];
    getBlogsByPage(6, lastSnapshot)
      .then((res) => {
        console.log(res);
        blogDispatch({ type: "blogs", value: [...blogReducer.blogs, ...res.docs] });
        blogDispatch({type: 'loadStatus', value: {isLoading: false, isDisabled: false}})
      })
      .catch((error) => {
        alert("Error fetching blogs");
        console.error(error);
      });
    setTimeout(()=>{
      if(blogReducer.blogs.length <= (blogReducer.totalPage * 6)){
        blogDispatch({type: 'loadStatus', value: {isLoading: false, isDisabled: true}})
      }
    }, 2000)
  }, [blogReducer.blogs, blogReducer.totalPage]);

  
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

      <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
        {blogReducer.blogs.map((blog) => {
          return (
            <BlogContainer
              key={blog.id}
              blog={{ id: blog.id, ...blog.data() }}
              onEdit={handleEditBlog}
              onDelete={handleDeleteBlog}
            />
          );
        })}
      </div>

      <div className="flex justify-center mt-4 items-ceter">
        <Button
          variant="light"
          color="primary"
          size="sm"
          onClick={fetchMoreBlogs}
          isLoading={blogReducer.loadStatus.isLoading}
          isDisabled={blogReducer.loadStatus.isDisabled}
        >
          Load More
        </Button>
      </div>

    </>
  );
}
