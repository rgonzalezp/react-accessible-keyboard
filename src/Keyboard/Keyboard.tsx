import * as React from "react";
import Key from "./../Key/Key";
import TextBox from "./../TextBox/TextBox";
import * as CSS from "csstype";
const { useState, useEffect } = React;

const Keyboard = ({
  onKeyboardLoad,
  onSubmit,
  className,
  location,
  arrayWords,
  darkmode,
}: any) => {
  interface Style extends CSS.Properties, CSS.PropertiesHyphen {}
  //receive keys as props, not state
  const [keySet, setKeys] = useState([
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
  ]);

  const primaryKeysDefault = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
  ];
  const secondaryKeysDefault = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    ["@", "#", "$", "_", "&", "-", "+", "(", ")", "/"],
    ["*", '"', "'", ":", ";", "!", "?", ".", ","],
  ];

  const [keyHeight, setHeight] = useState(0);
  const [userinput, setUserinput] = useState("");
  const [shiftifyBoolean, setShiftifyBoolean] = useState(false);
  const [secondaryBoolean, setSecondaryBoolean] = useState(true);

  const textBoxFlex: Style = {
    width: "100%",
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
    "vertical-align": "middle",
  } as const;

  const retrieveKeyboardInfo = () => {
    const keyboardContainer = window.document.getElementById("keyboard");

    let data = {
      keyboardHeight: keyboardContainer?.clientHeight,
      keyboardWidth: keyboardContainer?.clientWidth,
    };
    onKeyboardLoad(data);
  };

  const retrieveKeyInfo = (e: any) => {
    let textToSet = userinput.concat(e.content);
    setUserinput(textToSet);
  };

  const retrieveSpecialKeyInfo = (e: any) => {
    let textToSet = userinput.concat(" ").concat(e.content);
    setUserinput(textToSet);
  };

  const sendQuery = (e: any) => {
    let textToUseAndEliminate = userinput;

    //E Contains tap info, bubbles up the whole textarea and deletes it.
    setUserinput("");
    onSubmit(textToUseAndEliminate, e);
  };

  const deleteInput = () => {
    let textToSet = userinput.substring(0, userinput.length - 1);
    setUserinput(textToSet);
  };

  const spaceInput = () => {
    let textToSet = userinput.concat(" ");
    setUserinput(textToSet);
  };

  const setSecondary = () => {
    
    if (secondaryBoolean) {
      setKeys(secondaryKeysDefault);
    } else {
      setKeys(primaryKeysDefault);
    }
    setSecondaryBoolean(!secondaryBoolean);
  };

  const shiftify = () => {
    const shiftifiedArray:
      | ((prevState: string[][]) => string[][])
      | any[][] = [];

    setShiftifyBoolean(!shiftifyBoolean);
    if (shiftifyBoolean) {
      keySet.forEach((keyRow) => {
        const shiftifiedRow: any[] = [];
        keyRow.forEach((key) => {
          shiftifiedRow.push(key.toLocaleUpperCase());
        });
        shiftifiedArray.push(shiftifiedRow);
      });
    } else {
      keySet.forEach((keyRow) => {
        const shiftifiedRow: any[] = [];
        keyRow.forEach((key) => {
          shiftifiedRow.push(key.toLocaleLowerCase());
        });
        shiftifiedArray.push(shiftifiedRow);
      });
    }

    setKeys(shiftifiedArray);
  };

  useEffect(() => {
    //Setting keyboard keys size
    const viewPortHeight = window.innerHeight;

    const promise = new Promise((resolve, reject) => {
      setHeight(viewPortHeight * 0.07);
      resolve(keyHeight);
    });

    promise.then((res) => {
      //Set state to send keyboard information.
      retrieveKeyboardInfo();
    });

    //Keyboard information

    // const currentElementClientRect = currentElement.getBoundingClientRect();
    // var key = {x:0,y:0,height:0,width:0,label:value};
    // key.x = currentElementClientRect.x - 300 + currentElementClientRect.width / 2;
    // key.y = currentElementClientRect.y - 300 + currentElementClientRect.height / 2;
    // key.height = currentElementClientRect.height;
    // key.width = currentElementClientRect.width;
    return () => {};
  }, [keyHeight]);

  return (
    <div className={className}>
      <div style={textBoxFlex}>
        {location === "top" ? (
          <TextBox darkmode={darkmode} userinput={userinput} />
        ) : null}
        <Key
          id="react-accessible-keyboard-submit"
          darkmode={darkmode}
          value={"Submit"}
          height={keyHeight}
          getKeyOnClick={sendQuery}
        ></Key>
      </div>
      <div id="keyboard">
        <div className="react-accessible-keyboard-row">
          <Key
            id="react-accessible-keyboard-autocomplete1"
            darkmode={darkmode}
            value={arrayWords[0]}
            height={keyHeight}
            getKeyOnClick={retrieveSpecialKeyInfo}
          ></Key>
          <Key
            id="react-accessible-keyboard-autocomplete2"
            darkmode={darkmode}
            value={arrayWords[1]}
            height={keyHeight}
            getKeyOnClick={retrieveSpecialKeyInfo}
          ></Key>
          <Key
            id="react-accessible-keyboard-autocomplete3"
            darkmode={darkmode}
            value={arrayWords[2]}
            height={keyHeight}
            getKeyOnClick={retrieveSpecialKeyInfo}
          ></Key>
        </div>
        {keySet.map((keyRow) => {
          return (
            <div className="react-accessible-keyboard-row">
              {keyRow.map((key) => {
                return (
                  <Key
                    id={key}
                    darkmode={darkmode}
                    value={key}
                    height={keyHeight}
                    getKeyOnClick={retrieveKeyInfo}
                  ></Key>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="react-accessible-keyboard-row">
        <Key
          id="react-accessible-keyboard-shift"
          darkmode={darkmode}
          value={secondaryBoolean?"secondary":"primary"}
          height={keyHeight}
          getKeyOnClick={setSecondary}
        ></Key>
        <Key
          id="react-accessible-keyboard-shift"
          darkmode={darkmode}
          value={"shift"}
          height={keyHeight}
          getKeyOnClick={shiftify}
        ></Key>
        <Key
          id="react-accessible-keyboard-backspace"
          darkmode={darkmode}
          value={"backspace"}
          height={keyHeight}
          getKeyOnClick={spaceInput}
        ></Key>
        <Key
          id="react-accessible-keyboard-delete"
          darkmode={darkmode}
          value={"delete"}
          height={keyHeight}
          getKeyOnClick={deleteInput}
        ></Key>
      </div>
      {location === "bottom" ? <TextBox /> : null}
      {location !== "bottom" && location !== "top" ? <TextBox /> : null}
    </div>
  );
};

//default render is at the bottom if the person doesn't set the location prop.

export default Keyboard;
