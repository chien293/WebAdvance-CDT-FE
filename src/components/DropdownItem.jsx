import React from "react";
import Link from "next/link";

const DropdownItem = ({ href, title }) => {

  return (
    <div>
      <li>
        <Link
          href={href}
          class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
          {title}
        </Link>
      </li>
    </div>
  );
};

export default DropdownItem;
