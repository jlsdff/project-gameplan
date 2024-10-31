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
  version: "2.29.1",
};

export default function Editor({
  defaultData = _defaultData,
  tools = EDITOR_JS_TOOLS,
  editorInstance,
  setEditorInstance,
}) {
  const editorContainer = useRef(null);

  const initializeEditor = useCallback(async () => {

      const editor = new EditorJS({
        holder: editorContainer.current,
        tools: tools,
        data: defaultData
      });

      setEditorInstance(editor);

  },[defaultData, setEditorInstance, tools])
  

  useEffect(() => {
    if (editorInstance && editorInstance.current){
      editorInstance.current.isReady.then(() => {
        editorInstance.current.render(defaultData);
      });
    } else {
      initializeEditor();
    }
  
    // Cleanup on unmount
    return () => {
      if (editorInstance && editorInstance.current) {
        editorInstance.current.destroy();
      }
    };
  }, [defaultData]);


  return <div ref={editorContainer} />;
}
