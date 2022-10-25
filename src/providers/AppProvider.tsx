import React, {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { malagaConfig } from "../utils/malagaConfig";

interface AppContextValue {
  clientAddr: string | null;
  setClientAddr: Dispatch<SetStateAction<string | null>>;
  connectWallet: () => void;
}
export const AppContext = React.createContext<AppContextValue | null>(null);

const AppProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [clientAddr, setClientAddr] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      await window.keplr?.enable("malaga-420");
    } catch (err) {
      await window.keplr?.experimentalSuggestChain(malagaConfig);
      await window.keplr?.enable("malaga-420");
    }
    const signer = window.keplr?.getOfflineSigner("malaga-420");
    if (!signer) return;
    const [{ address }] = await signer?.getAccounts();
    setClientAddr(address);
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <AppContext.Provider value={{ clientAddr, setClientAddr, connectWallet }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (!context) throw new Error("App Context Provider is not instanced");
  return context;
};

export default AppProvider;
