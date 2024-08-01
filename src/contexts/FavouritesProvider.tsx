import React, {
  createContext,
  useContext,
  useReducer,
  Dispatch,
  useEffect,
} from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

type State = {
  favorites: any[];
};

type Action =
  | { type: "ADD_TO_FAVORITES"; payload: any }
  | { type: "REMOVE_FROM_FAVORITES"; payload: any }
  | { type: "RESET_FAVORITES" };

const FavoritesContext = createContext<
  { state: State; dispatch: Dispatch<Action> } | undefined
>(undefined);

const initialState: State = {
  favorites: [],
};

const favoritesReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TO_FAVORITES":
      if (state.favorites.find((item) => item.id === action.payload.id)) {
        toast.info("Product is already in favorites");
        return state; // Item already in favorites
      }
      toast.success("Product added to favorites");
      return { ...state, favorites: [...state.favorites, action.payload] };
    case "REMOVE_FROM_FAVORITES":
      toast.success("Product removed from favorites");
      return {
        ...state,
        favorites: state.favorites.filter((item) => item.id !== action.payload),
      };
    case "RESET_FAVORITES":
      return initialState;
    default:
      return state;
  }
};

export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(favoritesReducer, initialState);

  useEffect(() => {
    const savedState = Cookies.get("favoritesState");
    if (savedState) {
      const parsedState: State = JSON.parse(savedState);
      parsedState.favorites.forEach((item) =>
        dispatch({ type: "ADD_TO_FAVORITES", payload: item })
      );
    }
  }, []);

  useEffect(() => {
    Cookies.set("favoritesState", JSON.stringify(state), { expires: 7 });
  }, [state]);

  return (
    <FavoritesContext.Provider value={{ state, dispatch }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
