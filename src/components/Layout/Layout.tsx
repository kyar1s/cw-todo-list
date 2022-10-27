import React, { PropsWithChildren } from "react";
import { useAppContext } from "../../providers/AppProvider";
import { IntlAddress } from "../../utils/intl";
import { GradientButton } from "../Buttons";

const Layout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const { connectWallet, clientAddr } = useAppContext();
  return (
    <div className="flex flex-col h-[100vh] bg-slate-800">
      <nav className="max-w-[1000px] p-4 mx-auto w-full flex items-center justify-between gap-4">
        {clientAddr && (
          <>
            <p className="font-extrabold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-amber-400 via-pink-400 to-indigo-500">
              TODO's
            </p>
            <p className="text-white text-md">{IntlAddress(clientAddr)}</p>
          </>
        )}
      </nav>
      {clientAddr ? (
        <div className="flex items-center justify-center max-w-[1000px] w-full mx-auto p-4 h-full ">
          {children}
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <GradientButton onClick={connectWallet}>Log in!</GradientButton>
        </div>
      )}
    </div>
  );
};

export default Layout;
