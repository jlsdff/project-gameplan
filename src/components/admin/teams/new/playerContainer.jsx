import React from "react";
import { Avatar, Button } from "@nextui-org/react";

export default function PlayerContainer({ player, endContent }) {
  const { firstname, lastname, positions, number, imageUrl, id } = player;

  return (
    <div className="flex items-center justify-between px-4 py-2 border rounded-lg border-secondary-500/5 hover:border-secondary-500">
      <div className="flex gap-2">
        <div>
          <Avatar src={imageUrl} showFallback name={`${firstname}`} />
        </div>
        <div>
          <h3 className="font-bold">
            {`${lastname}, ${firstname}`}&nbsp;
            <span className="text-sm font-medium">{`#${number}`}</span>
          </h3>
          <p className="text-xs">{positions.join(" | ")}</p>
        </div>
      </div>
      <div>
        {endContent.map((content, index) => (
          <Button
            key={index}
            isIconOnly={content.isIconOnly}
            size={content.size || "sm"}
            color={content.color || "secondary"}
            radius={content.radius || "none"}
            onClick={() => {
              content.onClick(player);
            }}
          >
            {content.icon ? content.icon : content.text}
          </Button>
        ))}
      </div>
    </div>
  );
}
