import { createContext, ReactNode, useContext, useState } from "react";

const FavoritesContext = createContext({
  ids: [] as string[],
  toggleFavorite: (id: string) => {},
});

export const FavoritesContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [ids, setIds] = useState<string[]>([]);

  const toggleFavorite = (mealId: string) => {
    if (ids.includes(mealId)) {
      setIds((currentIds) => currentIds.filter((id) => id !== mealId));
    } else {
      setIds((currentIds) => [...currentIds, mealId]);
    }
  };

  return (
    <FavoritesContext.Provider value={{ ids, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavoritesContext = () => useContext(FavoritesContext);
