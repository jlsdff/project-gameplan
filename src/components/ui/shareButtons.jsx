"use client";
import React from "react";
import {
  FacebookMessengerShareButton,
  FacebookShareButton,
  TwitterShareButton,
  RedditShareButton,
  PinterestShareButton,
} from "react-share";
import FacebookIcon from "@/assets/facebookIcon";
import MessengerIcon from "@/assets/messengerIcon";
import TwitterIcon from "@/assets/twitterIcon";
import RedditIcon from "@/assets/redditIcon";
import PinterestIcon from "@/assets/pinterestIcon";

export default function ShareButtons({ url, title, fill, ...props }) {

  const color = fill ? fill : "#c65001"

  return (
    <div className="flex items-start justify-start gap-2">
      <FacebookShareButton url={url}>
        <FacebookIcon size={30} filled={true} fill={color} />
      </FacebookShareButton>
      <FacebookMessengerShareButton url={url} appId="1467449650519731">
        <MessengerIcon size={30} filled={true} fill={color} />
      </FacebookMessengerShareButton>
      <TwitterShareButton url={url} title={title}>
        <TwitterIcon size={30} filled={true} fill={color} />
      </TwitterShareButton>
      <RedditShareButton
        url={url}
        title={title}
        windowWidth={660}
        windowHeight={460}
      >
        <RedditIcon size={30} filled={true} fill={color} />
      </RedditShareButton>
    </div>
  );
}
