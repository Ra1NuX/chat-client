import React from "react";
const themes = {light: "light", dark: "dark"}
export default React.createContext(themes.light);