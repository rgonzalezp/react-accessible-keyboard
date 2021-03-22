import * as React from "react";
import * as CSS from "csstype";

const Key = ({ getKeyOnClick, value, width, height }: any) => {
  interface Style extends CSS.Properties, CSS.PropertiesHyphen {}

  const retrieveKeyInfo = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const currentElement = window.document.getElementById(value);
    if (currentElement === null) {
    } else {
      let tapInfo = {
        x: event.clientX,
        y: event.clientY,
        content: value,
      };
      getKeyOnClick(tapInfo);
    }
  };

  const keyboardKey: Style = {
    width: "20%",
    "min-width": "40px",
    height: height,
    position: "relative",
  } as const;

  return (
    <button
      style={keyboardKey}
      id={value}
      onClick={(event) => retrieveKeyInfo(event)}
    >
      {value}
    </button>
  );
};

export default Key;
