import React from "react";

type ColorsTabsProps = {
  activeColor: string;
  setActiveColor: React.Dispatch<React.SetStateAction<string>>;
  color: string;
}

const ColorsTabs = ({ activeColor, color, setActiveColor }: ColorsTabsProps) => {
  return (
    <div
      onClick={() => {
        setActiveColor(color);
      }}
      style={{
        backgroundColor: color,
      }}
      className={`min-h-4  transition-all min-w-4 cursor-pointer  ${activeColor === color ? "border-2" : "border-none"
        } rounded-full `}
    ></div>
  );
};

export default ColorsTabs;
