import React, { useCallback, useState } from "react";
import {
  Image,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import MoreIcon from "@/assets/moreIcon";
import EditIcon from "@/assets/editIcon";
import DeleteIcon from "@/assets/deleteIcon";
import CheckIcon from "@/assets/checkIcon";
import { markBlogAsDraft, markBlogAsPublished } from "@/utils/blogsAPI";

export default function BlogContainer({ blog, onEdit, onDelete }) {
  

  const {
    id,
    title,
    thumbnail,
    content: {
      blocks: [description],
    },
    createdAt,
    updatedAt,
    status,
  } = blog;

  const [blogStatus, setBlogStatus] = useState(status);

  const dropdownItems = [
    {
      key: "edit",
      label: "Edit",
      className: "text-primary-500",
      color: "",
      icon: <EditIcon />,
      onClick: () => {onEdit(id); onOpen()},
    },
    {
      key: 'publish',
      label: 'Publish',
      className: 'text-success-500',
      color: 'success',
      icon: <CheckIcon />,
      onClick: () => {
        markBlogAsPublished(id)
          .then(()=> {
            alert('Blog Published')
            setBlogStatus('published')
          })
      }
    },
    {
      key: 'draft',
      label: 'Draft',
      className: 'text-warning-500',
      color: 'warning',
      icon: <CheckIcon />,
      onClick: () => {
        markBlogAsDraft(id)
          .then(()=> {
            alert('Blog Drafted')
            setBlogStatus('draft')
          })
      }
    },
    {
      key: "delete",
      label: "Delete",
      className: "text-error-500",
      color: "danger",
      icon: <DeleteIcon />,
      onClick: () => {onDelete(id)},
    },
  ];

  return (
    <React.Fragment>
      <div className="flex flex-col items-center justify-center gap-2 p-4 rounded-md md:flex-row ">
        <div className="object-contain h-full overflow-hidden md:overflow-visible aspect-video md:w-44">
          <Image src={thumbnail} alt={title} />
        </div>
        <div className="flex flex-col flex-grow gap-2 ">
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-md line-clamp-1">{title}</h2>

              <Dropdown>
                <DropdownTrigger>
                  <Button variant="light" color="primary" size="sm" isIconOnly>
                    <MoreIcon />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="blog-actions" items={dropdownItems}>
                  {(item) => (
                    <DropdownItem
                      key={item.key}
                      color={item.color}
                      className={item.className}
                      startContent={item.icon}
                      onClick={item.onClick}
                    >
                      {item.label}
                    </DropdownItem>
                  )}
                </DropdownMenu>
              </Dropdown>
            </div>
            <p className="text-sm line-clamp-1">{description.data.text}</p>
          </div>
          <div className="flex items-center justify-between">
            <span>
              {new Date(updatedAt.seconds * 1000).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            {blogStatus === "draft" ? (
              <Chip color="warning" variant="solid" radius="full" size="sm">
                Draft
              </Chip>
            ) : (
              <Chip color="success" variant="solid" radius="full" size="sm">
                Published
              </Chip>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
