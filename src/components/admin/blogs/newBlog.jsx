"use client";
import React, { useCallback, useReducer, useId, useEffect } from "react";
import {
  Input,
  ScrollShadow,
  Button,
  Modal,
  useDisclosure,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Divider,
  Image,
} from "@nextui-org/react";
import { createBlog, getBlogById, updateBlog } from "@/utils/blogsAPI";
import Editor from "@/components/ui/editor/editor";
import { useRouter, useSearchParams } from "next/navigation";
import { updateLeague } from "@/utils/leagueAPI";

const reducer = (state, action) => {
  switch (action.type) {
    case "titleInput":
      return {
        ...state,
        title: {
          ...state.title,
          isInvalid: false,
          titleInput: action.value,
        },
      };
    case "thumbnail":
      return {
        ...state,
        thumbnail: {
          ...state.thumbnail,
          file: action.value,
        },
      };
    case "content":
      return {
        ...state,
        content: action.value,
      };
    case "modal":
      return {
        ...state,
        modal: action.value,
      };
    case "editorInstance":
      return {
        ...state,
        editorInstance: action.value,
      };
    case "validateTitle":
      return {
        ...state,
        title: {
          title: state.title,
          isInvalid: !state.title.isInvalid,
          errorMessage: "Title is required",
        },
      };
    case "validateThumbnail":
      return {
        ...state,
        thumbnail: {
          ...state.thumbnail,
          isInvalid: !state.thumbnail.isInvalid,
          errorMessage: "Thumbnail is required",
        },
      };
    case "setBlogData":
      return {
        ...state,
        title: {
          ...state.title,
          titleInput: action.value.title,
        },
        thumbnail: {
          file: action.value.thumbnail,
        },
        content: action.value.content,
      };
  }
};

export default function NewBlog() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const searchParams = useSearchParams();
  const blogId = searchParams.get("id");
  const randomId = useId();

  const [blogReducer, blogDispatch] = useReducer(reducer, {
    title: {
      titleInput: "",
      errorMessage: "",
      isInvalid: false,
    },
    thumbnail: {
      file: null,
      errorMessage: "",
      isInvalid: false,
    },
    content: {},
    modal: {
      header: "",
      body: "",
      onModalContinue: () => {},
      onModalCancel: () => {},
    },
    editorInstance: null,
  });

  const validateBlog = useCallback(() => {
    if (!blogReducer.title.titleInput) {
      blogDispatch({ type: "validateTitle" });
      return false;
    }
    if (!blogReducer.thumbnail.file) {
      blogDispatch({ type: "validateThumbnail" });
      return false;
    }
    return true;
  }, [blogReducer.thumbnail, blogReducer.title]);

  const handlePublishedButton = useCallback(
    (e) => {
      e.preventDefault();
      blogDispatch({
        type: "modal",
        value: {
          header: "Publish Blog",
          body: "Are you sure you want to publish this blog?",
          onModalContinue: async () => {
            console.log("Published");

            if (!validateBlog()) return;

            const blogData = await blogReducer.editorInstance.save();

            const blog = {
              title: blogReducer.title.titleInput,
              content: blogData,
              thumbnail: blogReducer.thumbnail.file,
              status: "published",
            };

            if (blogId) {
              updateBlog(blogId, blog)  
              .then((res) => {
                alert("Blog updated successfully");
                router.push("/admin/dashboard/blogs");
              })
              .catch((error) => alert(error));
            } else {
              createBlog(file, blog)
                .then((res) => {
                  alert("Blog created successfully");
                  router.push("/admin/dashboard/blogs");
                })
                .catch((error) => alert(error));
            }
          },
          onModalCancel: () => {
            console.log("Cancelled");
          },
        },
      });
      onOpen();
    },
    [
      blogReducer.editorInstance,
      blogReducer.thumbnail.file,
      blogReducer.title.titleInput,
      onOpen,
      router,
      validateBlog,
      blogId,
    ]
  );

  const handleDraftButton = useCallback(
    (e) => {
      e.preventDefault();
      blogDispatch({
        type: "modal",
        value: {
          header: "Save Draft",
          body: "Are you sure you want to save this blog as a draft?",
          onModalContinue: async () => {
            if (!validateBlog()) return;

            const blogData = await blogReducer.editorInstance.save();

            const blog = {
              title: blogReducer.title.titleInput,
              content: blogData,
              thumbnail: blogReducer.thumbnail.file,
              status: "draft",
            };
            console.log(blog);
            if (blogId) {
              updateBlog(blogId, blog)
              .then((res) => {
                alert("Blog updated successfully");
                router.push("/admin/dashboard/blogs");
              })
              .catch((error) => alert(error));
            } else {
              createBlog(blog)
                .then((res) => {
                  alert("Blog saved as draft successfully");
                  router.push("/admin/dashboard/blogs");
                })
                .catch((error) => alert(error));
            }
            console.log("Drafted");
          },
          onModalCancel: () => {
            console.log("Cancelled");
          },
        },
      });
      onOpen();
    },
    [
      blogReducer.editorInstance,
      blogReducer.thumbnail.file,
      blogReducer.title.titleInput,
      onOpen,
      router,
      validateBlog,
      blogId
    ]
  );

  const handleCancelBlogButton = useCallback(
    (e) => {
      e.preventDefault();
      blogDispatch({
        type: "modal",
        value: {
          header: "Cancel Blog",
          body: "Are you sure you want to cancel this blog?",
          onModalContinue: () => {
            router.push("/admin/dashboard/blogs");
          },
          onModalCancel: () => {
            console.log("Cancelled");
          },
        },
      });
      onOpen();
    },
    [onOpen, router]
  );

  const fetchBlog = useCallback(async () => {
    await getBlogById(blogId).then((res) => {
      const blogData = {
        id: res.id,
        ...res.data(),
      };
      blogDispatch({ type: "setBlogData", value: blogData });
    });
  }, [blogId]);

  useEffect(() => {
    if (blogId) {
      fetchBlog();
    }
  }, [blogId, fetchBlog]);

  return (
    <>
      <main className="flex flex-col gap-6">
        <h1 className="text-xl md:text-3xl">New Blog</h1>
        <form className="flex flex-col gap-4">
          <Input
            label="Title"
            isInvalid={blogReducer.title.isInvalid}
            value={blogReducer.title.titleInput}
            onValueChange={(value) =>
              blogDispatch({ type: "titleInput", value })
            }
            required
            labelPlacement="outside"
            placeholder="Enter blog title"
            size="lg"
            className="w-full"
            errorMessage={blogReducer.title.errorMessage}
          />
          <div className="flex flex-col gap-2">
            <label htmlFor="thumbnail">Thumbnail</label>
            <input
              type="file"
              accept="image/*"
              id="thumbnail"
              required
              isInvalid={blogReducer.thumbnail.isInvalid}
              errorMessage={blogReducer.thumbnail.errorMessage}
              onChange={(e) => {
                blogDispatch({ type: "thumbnail", value: e.target.files[0] });
              }}
            />
            {blogReducer.thumbnail.isInvalid && (
              <>
                <br />
                <small className="text-red-500">
                  {blogReducer.thumbnail.errorMessage}
                </small>
              </>
            )}
          </div>
          <Divider />
          <ScrollShadow
            hideScrollBar
            id="blog-content"
            className="min-h-[50px] max-h-[400px] overflow-y-scroll "
          >
            <Editor
              defaultData={blogReducer.content}
              editorInstance={blogReducer.editorInstance}
              setEditorInstance={(editor) =>
                blogDispatch({ type: "editorInstance", value: editor })
              }
            />
          </ScrollShadow>
          <Divider />
          <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
            <Button onClick={(e) => handlePublishedButton(e)}>Publish</Button>
            <Button onClick={(e) => handleDraftButton(e)}>Draft</Button>
            <Button onClick={(e) => handleCancelBlogButton(e)}>Cancel</Button>
          </div>
        </form>
      </main>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>{blogReducer.modal.header}</ModalHeader>
              <ModalBody>
                <p>{blogReducer.modal.body}</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    blogReducer.modal.onModalCancel();
                    onClose();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    blogReducer.modal.onModalContinue();
                    onClose();
                  }}
                >
                  Continue
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
