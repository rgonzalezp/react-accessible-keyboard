import * as React from "react";
import * as CSS from "csstype";

const Key = ({ getKeyOnClick, value, height, id, darkmode }: any) => {
  interface Style extends CSS.Properties, CSS.PropertiesHyphen {}

  const retrieveKeyInfo = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const currentElement = window.document.getElementById(id);
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
    "max-width": "50%",
    width: "20%",
    "min-width": "20px",
    height: height,
    position: "relative",
    background: darkmode === true ? "black" : "white",
    color: darkmode === true ? "white" : "black",
    "font-size": "16px"
  } as const;

  // class react-keyboard-key, to modify style of all regular keys.
  return (
    <button
      style={keyboardKey}
      className="react-keyboard-key"
      id={id}
      onClick={(event) => retrieveKeyInfo(event)}
    >
      {value}
    </button>
  );
};

export default Key;
