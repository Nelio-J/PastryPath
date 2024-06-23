import { getData } from "../../../config/asyncStorage";

export const fetchStoredTheme = async (updateTheme) => {
    try {
      // Get your light/dark mode preference from asyncstorage with the key "PastryPathTheme"
      const themeData = await getData("PastryPathTheme");
  
      // Update the app's theme with the fetched preference
      if (themeData) {
        updateTheme(themeData);
      }
    } catch (e) {
      alert(e);
    }
  };