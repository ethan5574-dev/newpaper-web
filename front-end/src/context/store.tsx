'use client';

import { createContext, useContext, useTransition } from 'react';

const storeContext = createContext<any>(null);
export const useContextStore = () => useContext(storeContext);

const ContextStoreProvider = ({ children }: any) => {
  const [isPending, startTransition] = useTransition();
  return (
    <storeContext.Provider
      value={{
        isPending,
        startTransition,
      }}
    >
      {children}
    </storeContext.Provider>
  );
};
export default ContextStoreProvider;
