import React, { useContext, createContext, useState } from "react";

interface ContextTypeHeightForOverlay {
  height: number;
  setHeight: React.Dispatch<React.SetStateAction<number>>;
}

const HeightForOverlayContext = createContext<
  ContextTypeHeightForOverlay | undefined
>(undefined);

export const HeightForOverlayProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [height, setHeight] = useState<number>(0);

  return (
    <HeightForOverlayContext.Provider value={{ height, setHeight }}>
      {children}
    </HeightForOverlayContext.Provider>
  );
};

export const useHeightForOverlay = () => {
  const context = useContext(HeightForOverlayContext);
  if (!context) {
    throw new Error("HeightForOverlayContext is not provided");
  }
  return context;
};
