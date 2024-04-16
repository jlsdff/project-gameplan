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
  onSave,
  onChange,
  defaultData = _defaultData,
  tools = EDITOR_JS_TOOLS,
}) {
  const editorContainer = useRef(null);
  const [editorInstance, setEditorInstance] = useState(null);

  useEffect(() => {
    if (editorContainer.current) {
      const editor = new EditorJS({
        holder: editorContainer.current,
        tools: tools,
        data: defaultData,
        onChange: async () => {
          // if (onChange) {
          //   const updatedData = await editor.save();
          //   onChange(updatedData);
          // }
        },
        onReady: () => {
          console.log("Editor.js is ready to work!");
        },
        onSave: async () => {
          const savedData = await editor.saver().save()
            .then(outputData => {
              onSave(outputData);
            })
          return savedData;
        }
      });

      setEditorInstance(editor);
    }

    // Cleanup on unmount
    return () => {
      if (editorInstance) {
        editorInstance.destroy();
      }
    };
  }, [defaultData, tools, onChange, editorInstance, onSave]);

  return <div ref={editorContainer} />;
}
