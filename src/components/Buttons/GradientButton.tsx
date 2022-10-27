import React, { PropsWithChildren } from "react";

type ButtonAttributes = React.ButtonHTMLAttributes<HTMLButtonElement>;

const GradientButton: React.FC<PropsWithChildren<ButtonAttributes>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      className="bg-gradient-to-r from-amber-400 via-pink-400 to-indigo-500 py-3 px-5 rounded-lg text-slate-800 font-extrabold hover:filter hover:brightness-110"
      {...props}
    >
      {children}
    </button>
  );
};

export default GradientButton;
