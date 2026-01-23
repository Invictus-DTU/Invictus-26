import { createContext, useContext, useState } from "react";

const LoaderContext = createContext(null);

export function LoaderProvider({ children }) {
  const [domReady, setDomReady] = useState(false);
  const [modelReady, setModelReady] = useState(false);

  const isReady = domReady && modelReady;

  return (
    <LoaderContext.Provider
      value={{
        domReady,
        setDomReady,
        modelReady,
        setModelReady,
        isReady,
      }}
    >
      {children}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  return useContext(LoaderContext);
}
