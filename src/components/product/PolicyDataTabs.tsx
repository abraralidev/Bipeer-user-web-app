import React from "react";

type PolicyDataTabsProps = {
  Icon: any;
  title: string;
  desc: string;
}

const PolicyDataTabs = ({ Icon, title, desc }: PolicyDataTabsProps) => {
  return (
    <div className="py-2 px-1 flex items-center space-x-6">
      <Icon
        style={{
          fontSize: 42,
        }}
      />
      <div>
        <p className=" text-lg font-medium">{title} </p>
        <p className="text-sm">{desc} </p>
      </div>
    </div>
  );
};

export default PolicyDataTabs;
