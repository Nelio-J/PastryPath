import * as React from "react";
import { storeData, getData } from "../../config/asyncStorage";

export default function useFavourites() {
  // State to store the list of favourite bakeries. Uses a Set to make sure every entry is unique
  const [favourites, setFavourites] = React.useState(new Set());

  // Function to add or remove a bakery item from the Set & storage
  const addToFavourites = async (bakery) => {
    try {
      setFavourites((prevFavourites) => {
        const updatedFavourites = new Set(prevFavourites);

        // Remove the bakery from favourites if it's already added
        if (updatedFavourites.has(bakery)) {
          updatedFavourites.delete(bakery);
          console.log(`removed ${bakery} from favourites`);
        }
        // Else add the bakery to favourites if it's not already added
        else {
          updatedFavourites.add(bakery);
          console.log(`added ${bakery} to favourites`);
        }

        // Save the updated favourites to async storage
        storeData("Favourites", Array.from(updatedFavourites));

        return updatedFavourites;
      });
    } catch (e) {
      alert(e);
    }
  };

  // Function to get every bakery item saved in the user's storage
  const fetchFavourites = async () => {
    try {
      // Get data from asyncStorage with the key "Favourites"
      const fav = await getData("Favourites");

      // If fav returned a result, set the result to favourites, else just log that the list is empty
      if (fav) {
        setFavourites(new Set(fav));
        console.log("All favourites:", fav);
      } else {
        console.log("Favourites list is empty");
      }
    } catch (e) {
      alert(e);
    }
  };

  // Return an object with the current list of favourite bakeries and the functions for adding/removing and fetching the favourites from the user's storage.
  return { favourites, addToFavourites, fetchFavourites };
}
