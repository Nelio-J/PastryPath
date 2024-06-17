import * as React from "react";

import RootStack from "./app/components/RootStack";
import { storeData, getData } from "./config/asyncStorage";
import { ThemeContext } from "./context/ThemeContext";

export default function App() {
  const [theme, setTheme] = React.useState({ mode: "light" });

  const updateTheme = (newTheme) => {
    let mode;

    // if (!newTheme) {
    //   if (theme.mode === "dark") {
    //     mode = "light";
    //   } else {
    //     mode = "dark";
    //   }
    //   newTheme = { mode };
    // }

    if (!newTheme) {
      mode = theme.mode === "dark" ? "light" : "dark";
      newTheme = { mode };
    }
    setTheme(newTheme);
    storeData("PastryPathTheme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      <RootStack />
    </ThemeContext.Provider>
  );
}
