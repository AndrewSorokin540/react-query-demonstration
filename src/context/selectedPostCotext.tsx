import { useState } from "react";
import { createContext, useContext } from "react";

import type { PostT } from "types";

interface SelectedPostContextT {
  selectedPost?: PostT;
  setSelectedPost?: (post?: PostT) => void;
}

const SelectedPostContext = createContext<SelectedPostContextT>({});

export const SelectedPostContextProvider: React.FC = ({ children }) => {
  const [selectedPost, setSelectedPost] = useState<PostT | undefined>(
    undefined
  );
  return (
    <SelectedPostContext.Provider value={{ selectedPost, setSelectedPost }}>
      {children}
    </SelectedPostContext.Provider>
  );
};

export const useSelectedPostContext = () => {
  return useContext(SelectedPostContext);
};
