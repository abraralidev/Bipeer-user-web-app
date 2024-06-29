import React from "react";

type SizesTabsProps = {
  activeSize: string;
  setActiveSize: React.Dispatch<React.SetStateAction<string>>;
  size: string;
}

const SizesTabs = ({ activeSize, size, setActiveSize }: SizesTabsProps) => {
  return (
    <button
      onClick={() => {
        setActiveSize(size);
      }}
      //   style={{
      //     backgroundSize: size,
      //   }}
      className={`uppercase transition-colors p-2 cursor-pointer font-medium text-md ${activeSize === size ? "bg-[#DB4444] text-white" : "border"
        } rounded-md `}
    >
      {size}{" "}
    </button>
  );
};

export default SizesTabs;
