/* Vendored din ReactBits (star-border), re-tematizat VP:
   gradientul interior pe tokens coal, LED-ul implicit roșu —
   replica digitală a liniilor luminoase de pe fațadă. */

import React from "react";

type StarBorderProps<T extends React.ElementType> =
  React.ComponentPropsWithoutRef<T> & {
    as?: T;
    className?: string;
    children?: React.ReactNode;
    color?: string;
    speed?: React.CSSProperties["animationDuration"];
    thickness?: number;
  };

const StarBorder = <T extends React.ElementType = "button">({
  as,
  className = "",
  color = "#ff3b45",
  speed = "5s",
  thickness = 2,
  children,
  ...rest
}: StarBorderProps<T>) => {
  const Component = as || "button";

  return (
    <Component
      className={`relative inline-block overflow-hidden rounded-[12px] ${className}`}
      {...(rest as React.ComponentPropsWithoutRef<T>)}
      style={{
        padding: `${thickness}px`,
        ...(rest as { style?: React.CSSProperties }).style,
      }}
    >
      <div
        className="animate-star-movement-bottom absolute right-[-250%] bottom-[-11px] z-0 h-[50%] w-[300%] rounded-full opacity-70"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      ></div>
      <div
        className="animate-star-movement-top absolute top-[-10px] left-[-250%] z-0 h-[50%] w-[300%] rounded-full opacity-70"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      ></div>
      <div className="relative z-[1] inline-flex w-full items-center justify-center gap-2.5 rounded-[10px] border border-[rgba(227,6,19,0.45)] bg-gradient-to-b from-coal-700 to-coal-850 px-[26px] py-[15px] text-center text-[15px] font-bold text-paper">
        {children}
      </div>
    </Component>
  );
};

export default StarBorder;
