import React from "react";
import Link from "next/link";

interface MobileLinkProps {
  href: string;
  text: string;
  active: boolean;
  onClick: () => void;
}

export const MobileLink: React.FC<MobileLinkProps> = ({
  active,
  href,
  text,
  onClick,
}) => {
  return (
    <div className={`px-6 py-2`} onClick={onClick}>
      <Link href={href}>
        <a className={`${active ? "text-white" : "text-gray-400"} font-medium`}>
          {text}
        </a>
      </Link>
    </div>
  );
};
