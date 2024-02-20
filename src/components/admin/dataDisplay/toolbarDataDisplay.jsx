import React from "react";
import { Input, Divider, Button, Tooltip } from "@nextui-org/react";

export default function ToolbarDataDisplay({
  title,
  searchComponent,
  toolBars,
}) {
  const {
    label,
    placeholder,
    value,
    onChange,
    onSearch,
    isIconOnly,
    icon,
    isDisabled,
    color,
    searchVariant,
    ...searchComponentProps
  } = searchComponent;
  return (
    <>
      {title && <h1 className="text-2xl font-bold">{title}</h1>}
      <section className="flex justify-start items-center">
        {searchComponent && (
          <div className="flex w-full gap-2 justify-center items-center">
            <Input
              className="w-full"
              variant="flat"
              label={label || "Search"}
              placeholder={placeholder || null}
              value={value}
              onValueChange={onChange}
            />
            <Button
              isDisabled={isDisabled}
              isIconOnly={isIconOnly}
              className=""
              color={color || "primary"}
              onClick={onSearch}
              variant={searchVariant || "flat"}
            >
              {isIconOnly ? icon : "Search"}
            </Button>
          </div>
        )}
        {toolBars && <Divider orientation="vertical" className="mx-4" />}
        {toolBars &&
          toolBars.map((toolbar, index) => {
            return (
              <Tooltip content={toolbar.toolTip || null} >
                <Button
                  key={index}
                  isIconOnly={toolbar.isIconOnly || false}
                  color={toolbar.variant || "primary"}
                  aria-label={toolbar.ariaLabel || ""}
                  onClick={toolbar.onClick}
                  isDisabled={toolbar.isDisabled || false}
                  size={toolbar.size || "md"}
                  radius={toolbar.radius || "medium"}
                  variant={toolbar.variant || "light"}
                  className="me-1"
                >
                  {toolbar.icon || toolbar.label || ""}
                </Button>
              </Tooltip>
            );
          })}
      </section>
    </>
  );
}
