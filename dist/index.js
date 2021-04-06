

function ___$insertStyle(css) {
  if (!css) {
    return;
  }
  if (typeof window === 'undefined') {
    return;
  }

  var style = document.createElement('style');

  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  document.head.appendChild(style);
  return css;
}

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () {
                        return e[k];
                    }
                });
            }
        });
    }
    n['default'] = e;
    return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);

___$insertStyle(".react-accessible-keyboard-row {\n  --bg-color: transparent;\n  --base-color: #666;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  border: 1px solid var(--base-color);\n  color: var(--base-color);\n  background-color: var(--bg-color);\n  cursor: pointer;\n  overflow: hidden;\n}\n\n#react-accessible-keyboard-backspace {\n  width: 50% !important;\n}\n\n#react-accessible-keyboard-shift {\n  width: 25% !important;\n}\n\n#react-accessible-keyboard-delete {\n  width: 25% !important;\n}\n\n#react-accessible-keyboard-autocomplete1 {\n  width: 33% !important;\n}\n\n#react-accessible-keyboard-autocomplete2 {\n  width: 34% !important;\n}\n\n#react-accessible-keyboard-autocomplete3 {\n  width: 33% !important;\n}\n\n#react-accessible-keyboard-submit {\n  margin-left: 10px;\n}\n\n#react-accessible-keyboard-textarea {\n  --base-color: #666;\n  max-width: 90%;\n  width: 70%;\n  border: 1px solid var(--base-color);\n  -moz-border-bottom-colors: none;\n  -moz-border-left-colors: none;\n  -moz-border-right-colors: none;\n  -moz-border-top-colors: none;\n  border-color: -moz-use-text-color #FFFFFF #FFFFFF -moz-use-text-color;\n  border-image: none;\n  border-radius: 6px 6px 6px 6px;\n  border-style: solid solid solid solid;\n  border-width: 2px 2px 2px 2px;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12) inset;\n  color: white;\n  font-family: Helvetica, Arial, sans-serif;\n  font-size: 16px;\n  transition: background-color 0.2s ease 0s;\n}\n\n@media screen and (max-width: 991px) {\n  /* start of large tablet styles */\n}\n@media screen and (max-width: 767px) {\n  /* start of medium tablet styles */\n}\n@media screen and (max-width: 479px) {\n  /* start of phone styles */\n}");

function CustomKeyboard() {
    return (React__namespace.createElement("div", null));
}

var Key = function (_a) {
    var getKeyOnClick = _a.getKeyOnClick, value = _a.value, height = _a.height, id = _a.id, darkmode = _a.darkmode;
    var retrieveKeyInfo = function (event) {
        var currentElement = window.document.getElementById(id);
        if (currentElement === null) ;
        else {
            var tapInfo = {
                x: event.clientX,
                y: event.clientY,
                content: value,
            };
            getKeyOnClick(tapInfo);
        }
    };
    var keyboardKey = {
        "max-width": "50%",
        width: "20%",
        "min-width": "20px",
        height: height,
        position: "relative",
        background: darkmode === true ? "black" : "white",
        color: darkmode === true ? "white" : "black",
        "font-size": "16px"
    };
    // class react-keyboard-key, to modify style of all regular keys.
    return (React__namespace.createElement("button", { style: keyboardKey, className: "react-keyboard-key", id: id, onClick: function (event) { return retrieveKeyInfo(event); } }, value));
};

var TextBox = function (_a) {
    var darkmode = _a.darkmode, userinput = _a.userinput;
    var textBox = {
        background: darkmode === true ? "black" : "white",
        color: darkmode === true ? "white" : "black",
    };
    return (React__namespace.createElement("textarea", { style: textBox, id: "react-accessible-keyboard-textarea", disabled: true, value: userinput }));
};

var useState = React__namespace.useState, useEffect = React__namespace.useEffect;
var Keyboard = function (_a) {
    var onKeyboardLoad = _a.onKeyboardLoad, onSubmit = _a.onSubmit, className = _a.className, location = _a.location, arrayWords = _a.arrayWords, darkmode = _a.darkmode;
    //receive keys as props, not state
    var _b = useState([
        ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
        ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
        ["z", "x", "c", "v", "b", "n", "m"],
    ]), keySet = _b[0], setKeys = _b[1];
    var primaryKeysDefault = [
        ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
        ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
        ["z", "x", "c", "v", "b", "n", "m"],
    ];
    var secondaryKeysDefault = [
        ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
        ["@", "#", "$", "_", "&", "-", "+", "(", ")", "/"],
        ["*", '"', "'", ":", ";", "!", "?", ".", ","],
    ];
    var _c = useState(0), keyHeight = _c[0], setHeight = _c[1];
    var _d = useState(""), userinput = _d[0], setUserinput = _d[1];
    var _e = useState(false), shiftifyBoolean = _e[0], setShiftifyBoolean = _e[1];
    var _f = useState(true), secondaryBoolean = _f[0], setSecondaryBoolean = _f[1];
    var textBoxFlex = {
        width: "100%",
        display: "flex",
        "justify-content": "center",
        "align-items": "center",
        "vertical-align": "middle",
    };
    var retrieveKeyboardInfo = function () {
        var keyboardContainer = window.document.getElementById("keyboard");
        var data = {
            keyboardHeight: keyboardContainer === null || keyboardContainer === void 0 ? void 0 : keyboardContainer.clientHeight,
            keyboardWidth: keyboardContainer === null || keyboardContainer === void 0 ? void 0 : keyboardContainer.clientWidth,
        };
        onKeyboardLoad(data);
    };
    var retrieveKeyInfo = function (e) {
        var textToSet = userinput.concat(e.content);
        setUserinput(textToSet);
    };
    var retrieveSpecialKeyInfo = function (e) {
        var textToSet = userinput.concat(" ").concat(e.content);
        setUserinput(textToSet);
    };
    var sendQuery = function (e) {
        var textToUseAndEliminate = userinput;
        //E Contains tap info, bubbles up the whole textarea and deletes it.
        setUserinput("");
        onSubmit(textToUseAndEliminate, e);
    };
    var deleteInput = function () {
        var textToSet = userinput.substring(0, userinput.length - 1);
        setUserinput(textToSet);
    };
    var spaceInput = function () {
        var textToSet = userinput.concat(" ");
        setUserinput(textToSet);
    };
    var setSecondary = function () {
        if (secondaryBoolean) {
            setKeys(secondaryKeysDefault);
        }
        else {
            setKeys(primaryKeysDefault);
        }
        setSecondaryBoolean(!secondaryBoolean);
    };
    var shiftify = function () {
        var shiftifiedArray = [];
        setShiftifyBoolean(!shiftifyBoolean);
        if (shiftifyBoolean) {
            keySet.forEach(function (keyRow) {
                var shiftifiedRow = [];
                keyRow.forEach(function (key) {
                    shiftifiedRow.push(key.toLocaleUpperCase());
                });
                shiftifiedArray.push(shiftifiedRow);
            });
        }
        else {
            keySet.forEach(function (keyRow) {
                var shiftifiedRow = [];
                keyRow.forEach(function (key) {
                    shiftifiedRow.push(key.toLocaleLowerCase());
                });
                shiftifiedArray.push(shiftifiedRow);
            });
        }
        setKeys(shiftifiedArray);
    };
    useEffect(function () {
        //Setting keyboard keys size
        var viewPortHeight = window.innerHeight;
        var promise = new Promise(function (resolve, reject) {
            setHeight(viewPortHeight * 0.07);
            resolve(keyHeight);
        });
        promise.then(function (res) {
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
        return function () { };
    }, [keyHeight]);
    return (React__namespace.createElement("div", { className: className },
        React__namespace.createElement("div", { style: textBoxFlex },
            location === "top" ? (React__namespace.createElement(TextBox, { darkmode: darkmode, userinput: userinput })) : null,
            React__namespace.createElement(Key, { id: "react-accessible-keyboard-submit", darkmode: darkmode, value: "Submit", height: keyHeight, getKeyOnClick: sendQuery })),
        React__namespace.createElement("div", { id: "keyboard" },
            React__namespace.createElement("div", { className: "react-accessible-keyboard-row" },
                React__namespace.createElement(Key, { id: "react-accessible-keyboard-autocomplete1", darkmode: darkmode, value: arrayWords[0], height: keyHeight, getKeyOnClick: retrieveSpecialKeyInfo }),
                React__namespace.createElement(Key, { id: "react-accessible-keyboard-autocomplete2", darkmode: darkmode, value: arrayWords[1], height: keyHeight, getKeyOnClick: retrieveSpecialKeyInfo }),
                React__namespace.createElement(Key, { id: "react-accessible-keyboard-autocomplete3", darkmode: darkmode, value: arrayWords[2], height: keyHeight, getKeyOnClick: retrieveSpecialKeyInfo })),
            keySet.map(function (keyRow) {
                return (React__namespace.createElement("div", { className: "react-accessible-keyboard-row" }, keyRow.map(function (key) {
                    return (React__namespace.createElement(Key, { id: key, darkmode: darkmode, value: key, height: keyHeight, getKeyOnClick: retrieveKeyInfo }));
                })));
            })),
        React__namespace.createElement("div", { className: "react-accessible-keyboard-row" },
            React__namespace.createElement(Key, { id: "react-accessible-keyboard-shift", darkmode: darkmode, value: secondaryBoolean ? "secondary" : "primary", height: keyHeight, getKeyOnClick: setSecondary }),
            React__namespace.createElement(Key, { id: "react-accessible-keyboard-shift", darkmode: darkmode, value: "shift", height: keyHeight, getKeyOnClick: shiftify }),
            React__namespace.createElement(Key, { id: "react-accessible-keyboard-backspace", darkmode: darkmode, value: "backspace", height: keyHeight, getKeyOnClick: spaceInput }),
            React__namespace.createElement(Key, { id: "react-accessible-keyboard-delete", darkmode: darkmode, value: "delete", height: keyHeight, getKeyOnClick: deleteInput })),
        location === "bottom" ? React__namespace.createElement(TextBox, null) : null,
        location !== "bottom" && location !== "top" ? React__namespace.createElement(TextBox, null) : null));
};

exports.CustomKeyboard = CustomKeyboard;
exports.Keyboard = Keyboard;
exports.default = Keyboard;
//# sourceMappingURL=index.js.map
