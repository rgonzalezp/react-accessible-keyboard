import * as React from "react";
import Key from "./../Key/Key";
const { useState, useEffect } = React;

const Keyboard = ({ location }: any) => {
  //receive keys as props, not state
  const [keySet, setKeys] = useState([
    ["special1", "special2", "special3"],
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "n", "m", "delete"],
    ["shift", "backspace", "shift"],
  ]);

  const [keyWidth, setWidth] = useState(0);
  const [keyHeight, setHeight] = useState(0);

  useEffect(() => {
    //Setting keyboard keys size
    const viewPortHeight = window.innerHeight;
    const keyboardContainer = window.document.getElementById("keyboard");

    const promise = new Promise((resolve, reject) => {
      setHeight(viewPortHeight * 0.07);
      resolve(keyboardContainer?.clientHeight);
    });

    promise.then((res) => {
      //Set state to send keyboard information.
      console.log(res);
    });

    //Keyboard information

    // const currentElementClientRect = currentElement.getBoundingClientRect();
    // var key = {x:0,y:0,height:0,width:0,label:value};
    // key.x = currentElementClientRect.x - 300 + currentElementClientRect.width / 2;
    // key.y = currentElementClientRect.y - 300 + currentElementClientRect.height / 2;
    // key.height = currentElementClientRect.height;
    // key.width = currentElementClientRect.width;
    return () => {};
  }, []);

  return (
    <div>
      {location === "top" ? <div>top </div> : ""}
      <div id="keyboard">
        {keySet.map((keyRow) => {
          return (
            //change to Row whatever
            <div className="keyboard-row">
              {keyRow.map((key) => {
                return (
                  <Key
                    value={key}
                    height={keyHeight}
                    width={keyWidth}
                    getKeyOnClick={retrieveKeyInfo}
                  ></Key>
                );
              })}
            </div>
          );
        })}
      </div>
      {location === "bottom" ? <h1>bottom </h1> : ""}
    </div>
  );
};

const retrieveKeyInfo = (e: any) => {
  console.log(e);
};

export default Keyboard;
