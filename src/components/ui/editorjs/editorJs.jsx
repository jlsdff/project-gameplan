"use client";

import React, { useRef, useEffect, useCallback, useState } from "react";
import { EDITOR_JS_TOOLS } from "./tools";
import EditorJS from "@editorjs/editorjs";

const _defaultData = {
  time: new Date().getTime(),
  blocks: [
    {
      type: "header",
      data: {
        text: "Start Here!",
        level: 1,
      },
    },
  ],
};

export default function Editor({
  onSave,
  onChange,
  defaultData,
  tools,
}) {
  const ejInstance = useRef(null);

  const myData = defaultData || _defaultData;
  const myTools = tools || EDITOR_JS_TOOLS;

  const initializeEditor = useCallback(() => {
    const editor = new EditorJS({
      holder: "editorjs",
      tools: myTools,
      onReady: () => {
        ejInstance.current = editor;
      },
      onChange: () => {
        ejInstance.current.saver.save().then((outputData) => {
          onChange(outputData);
        });
      },
      data: myData,
    });
  }, []);

  useEffect(() => {
    if (ejInstance.current === null) {
      initializeEditor(); 
    }

    return () => {
      if (ejInstance.current) {
        ejInstance?.current?.destroy();
        ejInstance.current = null;
      }
    };
  }, []);

  return <div className="p-2" id="editorjs"></div>;
}
