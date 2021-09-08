import React from "react";
import Link from "next/link";

interface SideLinkProps {
  href: string;
  text: string;
  active: boolean;
}

export const SideLink: React.FC<SideLinkProps> = ({ active, href, text }) => {
  return (
    <Link href={href}>
      <a className={`${active ? 'text-white' : 'text-gray-400'} font-medium`}>{text}</a>
    </Link>
  );
};
