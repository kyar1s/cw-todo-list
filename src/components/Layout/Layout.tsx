import React, { PropsWithChildren } from "react";
import { useAppContext } from "../../providers/AppProvider";
import { IntlAddress } from "../../utils/intl";
import { GradientButton } from "../Buttons";
import { FiGithub } from "react-icons/fi";

const Layout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const { connectWallet, clientAddr } = useAppContext();
  return (
    <div className="flex flex-col bg-slate-800 min-h-screen justify-between">
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
      <footer className="w-full h-[5rem] bg-gradient-to-r from-amber-400 via-pink-400 to-indigo-500 flex items-center justify-center mt-[6rem]">
        <a
          className="pointer hover:underline text-slate-900 text-xl font-bold flex gap-2"
          href="https://github.com/kyar1s"
          target="_blank"
        >
          <FiGithub size={24} /> Iris - Kyaris
        </a>
      </footer>
    </div>
  );
};

export default Layout;
