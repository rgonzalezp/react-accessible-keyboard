

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

___$insertStyle(".counter {\n  --bg-color: #f3f3f3;\n  --base-color: #666;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100px;\n  width: 70px;\n  margin: 10% auto;\n  border: 3px solid var(--base-color);\n  border-radius: 5px;\n  color: var(--base-color);\n  background-color: var(--bg-color);\n  cursor: pointer;\n  overflow: hidden;\n}\n.counter:hover {\n  color: var(--bg-color);\n  background-color: var(--base-color);\n  border-color: var(--bg-color);\n}\n.counter__count {\n  font-size: 2rem;\n  font-family: \"Segoe UI\", sans-serif;\n  color: inherit;\n  animation: in 1s ease alternate forwards;\n  pointer-events: none;\n}\n\n.keyboard-row {\n  --bg-color: transparent;\n  --base-color: #666;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  border: 1px solid var(--base-color);\n  color: var(--base-color);\n  background-color: var(--bg-color);\n  cursor: pointer;\n  overflow: hidden;\n}\n\n.keyboard-row {\n  --bg-color: transparent;\n  --base-color: #666;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: auto;\n}\n\n#backspace {\n  width: 50% !important;\n}\n\n#shift {\n  width: 25% !important;\n}\n\n#special1 {\n  width: 33% !important;\n}\n\n#special2 {\n  width: 34% !important;\n}\n\n#special3 {\n  width: 33% !important;\n}\n\n@media screen and (max-width: 991px) {\n  /* start of large tablet styles */\n}\n@media screen and (max-width: 767px) {\n  /* start of medium tablet styles */\n}\n@media screen and (max-width: 479px) {\n  /* start of phone styles */\n}");

function CustomKeyboard() {
    return (React__namespace.createElement("div", null));
}

var Key = function (_a) {
    var getKeyOnClick = _a.getKeyOnClick, value = _a.value; _a.width; var height = _a.height;
    var retrieveKeyInfo = function (event) {
        var currentElement = window.document.getElementById(value);
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
        width: "20%",
        "min-width": "40px",
        height: height,
        position: "relative",
    };
    return (React__namespace.createElement("button", { style: keyboardKey, id: value, onClick: function (event) { return retrieveKeyInfo(event); } }, value));
};

var useState = React__namespace.useState, useEffect = React__namespace.useEffect;
var Keyboard = function (_a) {
    var location = _a.location;
    //receive keys as props, not state
    var _b = useState([
        ["special1", "special2", "special3"],
        ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
        ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
        ["z", "x", "c", "v", "b", "n", "n", "m", "delete"],
        ["shift", "backspace", "shift"],
    ]), keySet = _b[0]; _b[1];
    var _c = useState(0), keyWidth = _c[0]; _c[1];
    var _d = useState(0), keyHeight = _d[0], setHeight = _d[1];
    useEffect(function () {
        //Setting keyboard keys size
        var viewPortHeight = window.innerHeight;
        var keyboardContainer = window.document.getElementById("keyboard");
        var promise = new Promise(function (resolve, reject) {
            setHeight(viewPortHeight * 0.07);
            resolve(keyboardContainer === null || keyboardContainer === void 0 ? void 0 : keyboardContainer.clientHeight);
        });
        promise.then(function (res) {
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
        return function () { };
    }, []);
    return (React__namespace.createElement("div", null,
        location === "top" ? React__namespace.createElement("div", null, "top ") : "",
        React__namespace.createElement("div", { id: "keyboard" }, keySet.map(function (keyRow) {
            return (
            //change to Row whatever
            React__namespace.createElement("div", { className: "keyboard-row" }, keyRow.map(function (key) {
                return (React__namespace.createElement(Key, { value: key, height: keyHeight, width: keyWidth, getKeyOnClick: retrieveKeyInfo }));
            })));
        })),
        location === "bottom" ? React__namespace.createElement("h1", null, "bottom ") : ""));
};
var retrieveKeyInfo = function (e) {
    console.log(e);
};

exports.CustomKeyboard = CustomKeyboard;
exports.Keyboard = Keyboard;
exports.default = Keyboard;
//# sourceMappingURL=index.js.map
