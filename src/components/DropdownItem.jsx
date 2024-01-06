import React from "react";
import Link from "next/link";

const DropdownItem = ({ href, title }) => {
  return (
    <div className="flex-col block">
      <Link
        href={href}
        className="block px-4 py-2 font-bold rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 text-black dark:text-white"
      >
        {title}
      </Link>
    </div>
  );
};

export default DropdownItem;
