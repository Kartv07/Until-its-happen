import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css"; // Import SunEditor's CSS

const SunEditor = dynamic(() => import("suneditor-react"), { ssr: false });

// Dynamically import plugins
const usePlugins = () => {
  const [loadedPlugins, setLoadedPlugins] = useState([]);

  useEffect(() => {
    const loadPlugins = async () => {
      const module = await import("suneditor/src/plugins");
      setLoadedPlugins([
        module.align,
        module.font,
        module.fontColor,
        module.fontSize,
        module.formatBlock,
        module.hiliteColor,
        module.horizontalRule,
        module.lineHeight,
        module.list,
        module.paragraphStyle,
        module.table,
        module.template,
        module.textStyle,
        module.image,
        module.link,
        module.video,
      ]);
    };
    loadPlugins();
  }, []);

  return loadedPlugins;
};

const SunEditorComponent = ({ initialValue, setDescription, handleSaveDisable = ()=>{} }) => {
  const plugins = usePlugins();

  const handleChange = (newContent) => {
    setDescription(newContent);
    handleSaveDisable();
  };

  console.log(initialValue)

  return (
    <div>
      {plugins && plugins?.length > 0 && (
        <SunEditor
          defaultValue={initialValue}
          onChange={handleChange}
          lang="en"
          setOptions={{
            showPathLabel: false,
            minHeight: "50vh",
            placeholder: "Enter your text here!!!",
            defaultStyle:
              "font-size:18px; background-color : #f0f0f5; font-family :Time New Roman; height : auto;",
            plugins: plugins,
            buttonList: [
              ["bold", "underline", "italic"],
              ["fontColor", "hiliteColor"],
              ["paragraphStyle"],
              ["outdent", "indent"],
              ["align", "horizontalRule", "list", "lineHeight"],
              ["table", "link", "image", "video"],
              "/",
              ["undo", "redo"],
              ["font", "fontSize", "formatBlock"],
              ['fullScreen'],
            ],
            formats: ["div","pre", "h1", "h2", "h3", "h4", "h5", "h6", "p"],
            font: [
              "Arial",
              "Calibri",
              "Garamond",
              "Georgia",
              "Impact",
              "Palatino Linotype",
              "Segoe UI",
              "Tahoma",
              "Times New Roman",
              "Trebuchet MS",
            ],
          }}
        />
      )}
    </div>
  );
};

export default SunEditorComponent;
