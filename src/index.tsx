import * as React from "react";
import "./styles.scss";

import CustomKeyboard from "./CustomKeyboard/CustomKeyboard";
import Keyboard from "./Keyboard/Keyboard";

export { Keyboard, CustomKeyboard };

const { useState, useEffect } = React;

const App = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    return () => {};
  }, []);

  return <div></div>;
};

export default Keyboard;
