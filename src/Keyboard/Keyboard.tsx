import * as React from "react";
import Key from "./../Key/Key";
import TextBox from "./../TextBox/TextBox";
import * as CSS from "csstype";
const { useState, useEffect } = React;

const Keyboard = ({
  onKeyboardLoad,
  onSubmit,
  onKeyPressed,
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

  const [keyTapHistory, setKeyTapHistory] = useState(Array);

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

  const getEventCoordinatesKeyboard = (keyEvent: {
    x: number;
    y: number;
    content: String;
  }) => {
    const keyboardBounding = window.document
      .getElementById("keyboard")!
      .getBoundingClientRect();

    keyEvent.x = keyEvent.x - keyboardBounding.x;
    keyEvent.y = keyEvent.y - keyboardBounding.y;
    return keyEvent;
  };
  const retrieveKeyboardInfo = () => {
    const keyboardContainer = window.document.getElementById("keyboard");

    const keyboardBounding = window.document
      .getElementById("keyboard")!
      .getBoundingClientRect();
    let keys = Array.from(
      document.getElementsByClassName("react-keyboard-key")
    );
    let keysInfo: {
      labels: StringConstructor[];
      x: number;
      y: number;
      height: number;
      width: number;
    }[] = [];
    keys.forEach((element: any) => {
      if (document.getElementById(element.id) !== null) {
        let currentElement = document
          .getElementById(element.id)!
          .getBoundingClientRect();
        let key = { labels: [String], x: 0, y: 0, height: 0, width: 0 };

        key.labels = [element.id];
        //Center of each key, Relative position to the keyboard

        key.x =
          currentElement.x - keyboardBounding.x + currentElement.width / 2;
        key.y =
          currentElement.y - keyboardBounding.y + currentElement.height / 2;
        key.height = currentElement.height;
        key.width = currentElement.width;
        keysInfo.push(key);
      }
    });
    let heightRow: number = Array.from(
      document.getElementsByClassName("react-accessible-keyboard-row")
    )[0].getBoundingClientRect().height;

    let data = {
      keyboardHeight: 5 * heightRow!,
      keyboardWidth: keyboardContainer?.clientWidth!,
      keyboardKeys: keysInfo,
    };

    onKeyboardLoad(data);
  };

  const retrieveKeyInfo = (e: any) => {
    let textToSet = userinput.concat(e.content);
    const newSet = [...keyTapHistory, e];
    setKeyTapHistory(newSet);
    setUserinput(textToSet);
    const data = {
      keyPressed: getEventCoordinatesKeyboard(e),
      tapHistory: newSet,
      currentInput: textToSet,
    };
    onKeyPressed(data);
  };

  const retrieveSpecialKeyInfo = (e: any) => {
    let prefixInput = userinput.split(" ");
    let currentWord = prefixInput.pop();
    let prefixCleaned = prefixInput.join(" ");
    let textToSet = prefixCleaned.concat(" ").concat(e.content).concat(" ");
    if(prefixInput.length === 0) {
      textToSet = prefixCleaned.concat(e.content).concat(" ")
    }
    
    
    const newSet: React.SetStateAction<unknown[]> = [];
    setKeyTapHistory(newSet);
    setUserinput(textToSet);
    const data = {
      keyPressed: getEventCoordinatesKeyboard(e),
      tapHistory: newSet,
      currentInput: textToSet,
    };
    onKeyPressed(data);
    // change this functionality to complete the word thats currently being written and go on to the next one
  };

  const sendQuery = (e: any) => {
    let textToUseAndEliminate = userinput;

    //E Contains tap info, bubbles up the whole textarea and deletes it.
    setUserinput("");
    onSubmit(textToUseAndEliminate, e);
    const newSet: React.SetStateAction<unknown[]> = [];
    setKeyTapHistory(newSet);
  };

  const deleteInput = (e: any) => {
    let textToSet = userinput.substring(0, userinput.length - 1);
    let newkeyTapHistoryTodelete = keyTapHistory;
    newkeyTapHistoryTodelete.pop();
    let tapHistory = newkeyTapHistoryTodelete;
    const newSet = [...tapHistory];
    setKeyTapHistory(newSet);
    setUserinput(textToSet);
    const data = {
      keyPressed: getEventCoordinatesKeyboard(e),
      tapHistory: newSet,
      currentInput: textToSet,
    };
    onKeyPressed(data);
  };

  const spaceInput = (e: any) => {
    let textToSet = userinput.concat(" ");
    const newSet: React.SetStateAction<unknown[]> = [];
    setKeyTapHistory(newSet);
    setUserinput(textToSet);
    const data = {
      keyPressed: getEventCoordinatesKeyboard(e),
      tapHistory: newSet,
      currentInput: textToSet,
    };
    onKeyPressed(data);
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
        {
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
        }
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
          value={secondaryBoolean ? "secondary" : "primary"}
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
