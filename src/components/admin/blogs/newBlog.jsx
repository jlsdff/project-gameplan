"use client";
import React, { useCallback, useReducer } from "react";
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
  Divider
} from "@nextui-org/react";
import Editor from "@/components/ui/editorjs/editorJs";
import { createPortal } from "react-dom";
import { useRouter, useSearchParams } from "next/navigation";

const reducer = (state, action) => {
  switch (action.type) {
    case "titleInput":
      return {
        ...state,
        title: {
          ...state.title,
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
    case 'modal':
      return {
        ...state,
        modal: action.value
      }
  }
};

export default function NewBlog() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter()
  const searchParams = useSearchParams()
  
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
  });

  const handlePublishedButton = useCallback((e) => {
    e.preventDefault();
    blogDispatch({type: "modal", value: {
      header: "Publish Blog",
      body: "Are you sure you want to publish this blog?",
      onModalContinue: () => {
        console.log("Published")
      },
      onModalCancel: () => {
        console.log("Cancelled")
      }
    }})
    onOpen()
  },[]);

  const handleDraftButton = useCallback((e) => {
    e.preventDefault();
    blogDispatch({
      type: 'modal',
      value: {
        header: 'Save Draft',
        body: 'Are you sure you want to save this blog as a draft?',
        onModalContinue: () => {
          console.log('Drafted')
        },
        onModalCancel: () => {
          console.log('Cancelled')
        }
      }
    })
    onOpen()
  },[])

  const handleCancelBlogButton = useCallback(e => {
    e.preventDefault()
    blogDispatch({
      type: 'modal',
      value: {
        header: 'Cancel Blog',
        body: 'Are you sure you want to cancel this blog?',
        onModalContinue: () => {
          router.push('/admin/dashboard/blogs')
        },
        onModalCancel: () => {
          console.log('Cancelled')
        }
      }
    })
    onOpen()
  },[])

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
          />
          <div className="flex flex-col gap-2">
            <label htmlFor="thumbnail">Thumbnail</label>
            <input
              type="file"
              accept="image/*"
              id="thumbnail"
              required
              onChange={(e) => {
                blogDispatch({ type: "thumbnail", value: e.target.files[0] });
              }}
            />
          </div>
          <Divider />
          <ScrollShadow
            hideScrollBar
            id="blog-content"
            className="min-h-[50px] max-h-[400px] overflow-y-scroll "
          >
            <Editor
              onChange={(data) =>
                blogDispatch({ type: "content", value: data })
              }

            />
          </ScrollShadow>
          <Divider />
          <div className="flex flex-col gap-2 md:flex-row">
            <Button onClick={ (e) => handlePublishedButton(e)}>Publish</Button>
            <Button onClick={ (e) => handleDraftButton(e)}>Draft</Button>
            <Button onClick={ (e) => handleCancelBlogButton(e)}>Cancel</Button>
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
                    onClose()
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
