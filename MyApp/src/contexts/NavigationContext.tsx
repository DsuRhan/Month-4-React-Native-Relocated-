import React, { createContext, useRef } from "react";
import { NavigationContainerRef, ParamListBase } from "@react-navigation/native";

export const NavigationContext = createContext<any>(null);

export const NavigationProvider = ({ children }: { children: React.ReactNode }) => {
  const navRef = useRef<NavigationContainerRef<ParamListBase>>(null);
  const historyRef = useRef<string[]>([]);

  return (
    <NavigationContext.Provider value={{ navRef, historyRef }}>
      {children}
    </NavigationContext.Provider>
  );
};
