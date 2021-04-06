import * as React from 'react'
import * as CSS from "csstype";

const TextBox = ({ darkmode, userinput }: any) => {
    interface Style extends CSS.Properties, CSS.PropertiesHyphen {}

    const textBox: Style = {
        background: darkmode === true ? "black" : "white",
        color: darkmode === true ? "white" : "black",
      } as const;


    return (
    <textarea style={textBox} id= "react-accessible-keyboard-textarea" disabled value={userinput}></textarea>
    )
}

export default TextBox