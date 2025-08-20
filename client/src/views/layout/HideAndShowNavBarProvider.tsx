import { useContext, createContext, useState } from "react";

interface ContextTypeHideAndShowNavBar {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const HideAndShowNavBarContext = createContext<
  ContextTypeHideAndShowNavBar | undefined
>(undefined);

export const HideAndShowNavBarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <HideAndShowNavBarContext.Provider value={{ isVisible, setIsVisible }}>
      {children}
    </HideAndShowNavBarContext.Provider>
  );
};

export const useHideAndShowNavBarContextContext = () => {
  const context = useContext(HideAndShowNavBarContext);
  if (!context) {
    throw new Error(
      "HideAndShowNavBarContext должен использоваться внутри <AppProvider>"
    );
  }
  return context;
};
