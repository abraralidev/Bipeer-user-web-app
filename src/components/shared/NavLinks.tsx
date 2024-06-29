import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type NavLinksType = {
  redirectPath: string;
  title: string;
}

const NavLinks = ({ redirectPath, title }: NavLinksType) => {
  const pathname = usePathname()
  // const { pathname } = useLocation();
  return (
    <Link
      className={`hover:border-b-black hover:border-b-2 font-medium hover:pb-[2px] transition-all `}
      href={redirectPath}
    >
      {title}
    </Link>
  );
};

export default NavLinks;
