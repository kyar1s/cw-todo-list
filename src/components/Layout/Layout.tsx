import React, { PropsWithChildren } from "react";
import { useAppContext } from "../../providers/AppProvider";

const Layout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const { connectWallet, clientAddr } = useAppContext();
  return (
    <div className="flex flex-col h-[100vh] bg-slate-800">
      <nav className="max-w-[1000px] p-4 mx-auto w-full flex items-center justify-between gap-4">
        <button
          onClick={connectWallet}
          className="bg-gradient-to-r from-amber-400 via-pink-400 to-indigo-500 py-3 px-5 rounded-lg text-slate-800 font-extrabold hover:filter hover:brightness-110"
        >
          Log in!
        </button>
        <p className="font-extrabold text-transparent text-lg bg-clip-text bg-gradient-to-r from-amber-400 via-pink-400 to-indigo-500">
          {clientAddr}
        </p>
      </nav>
      <div className="flex items-center justify-center max-w-[1000px] w-full mx-auto p-4">
        {children}
      </div>
    </div>
  );
};

export default Layout;
