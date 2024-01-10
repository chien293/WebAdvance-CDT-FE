import React from "react";
import Link from "next/link";

const DropdownItem = ({ href, title }) => {
  return (
    <div className="flex-col block">
      <Link
        href={href}
        className="block px-4 py-2 font-bold rounded-lg hover:bg-gray-100 text-black "
      >
        {title}
      </Link>
    </div>
  );
};

export default DropdownItem;
