import React, { PropsWithChildren } from "react";
import { useAppContext } from "../../providers/AppProvider";
import { IntlAddress } from "../../utils/intl";
import { GradientButton } from "../Buttons";
import { FiGithub } from "react-icons/fi";
import SimpleDropdown from "../Dropdowns/SimpleDropdown";

const Layout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const { connectWallet, clientAddr, changeChain, chain } = useAppContext();
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <nav className="max-w-[1000px] p-4 mx-auto w-full flex items-center justify-between gap-4">
        {clientAddr && (
          <>
            <p className="font-extrabold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-amber-400 via-pink-400 to-indigo-500">
              TODO's
            </p>
            <div className="text-white text-md flex gap-4 justify-center items-center">
              {IntlAddress(clientAddr)}
              <SimpleDropdown
                options={[
                  { name: "Juno Testnet", click: () => changeChain("uni-5") },
                  {
                    name: "Malaga 420",
                    click: () => changeChain("malaga-420"),
                  },
                ]}
              >
                {chain === "malaga-420" ? "Malaga 420" : "Juno Testnet"}
              </SimpleDropdown>
            </div>
          </>
        )}
      </nav>
      {clientAddr ? (
        <div className="flex max-w-[1000px] w-full mx-auto p-4 h-full flex-1">
          {children}
        </div>
      ) : (
        <div className="flex items-center justify-center flex-1">
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
