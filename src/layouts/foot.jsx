import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-gray-800 pt-10 sm:mt-10 pt-10">
      <div className="max-w-6xl m-auto text-gray-800 flex flex-wrap justify-left">
        {/* Column 1 */}
        <div className="p-5 w-1/2 sm:w-4/12 md:w-3/12">
          {/* logo */}
          <div className="text-xs uppercase text-gray-400 font-medium mb-6">
            Company Name
          </div>

          <Link href="/">
            <p className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
              Home
            </p>
          </Link>
          <Link href="/about">
            <p className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
              About Us
            </p>
          </Link>
          <Link href="/services">
            <p className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
              Services
            </p>
          </Link>
        </div>

        {/* Column 2 */}
        <div className="p-5 w-1/2 sm:w-4/12 md:w-3/12">
          {/* logo */}
          <div className="text-xs uppercase text-gray-400 font-medium mb-6">
            Products
          </div>

          <Link href="/products">
            <p className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
              Our Products
            </p>
          </Link>
          <Link href="/pricing">
            <p className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
              Pricing
            </p>
          </Link>
          <Link href="/faq">
            <p className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
              FAQ
            </p>
          </Link>
        </div>

        {/* Column 3 */}
        <div className="p-5 w-1/2 sm:w-4/12 md:w-3/12">
          {/* logo */}
          <div className="text-xs uppercase text-gray-400 font-medium mb-6">
            Contact Us
          </div>

          <Link href="/contact">
            <p className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
              Contact
            </p>
          </Link>
          <Link href="/support">
            <p className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
              Support
            </p>
          </Link>
        </div>

        {/* Column 4 */}
        <div className="p-5 w-1/2 sm:w-4/12 md:w-3/12">
          {/* logo */}
          <div className="text-xs uppercase text-gray-400 font-medium mb-6">
            Legal
          </div>

          <Link href="/terms">
            <p className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
              Terms
            </p>
          </Link>
          <Link href="/privacy">
            <p className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
              Privacy
            </p>
          </Link>
        </div>
      </div>

      {/* footer bottom */}
      <div className="pt-2">
        <div
          className="flex pb-5 px-3 m-auto pt-5 border-t border-gray-500 text-gray-400 text-sm flex-col
          md:flex-row max-w-6xl"
        >
          <div className="mt-2">© 2022 Company Name. All Rights Reserved.</div>

          <div className="md:flex-auto md:flex-row-reverse mt-2 flex-row flex">
            <Link href="/">
              <p className="w-6 mx-1">
                <i className="uil uil-facebook-f"></i>
              </p>
            </Link>
            <Link href="/">
              <p className="w-6 mx-1">
                <i className="uil uil-twitter-alt"></i>
              </p>
            </Link>
            <Link href="/">
              <p className="w-6 mx-1">
                <i className="uil uil-youtube"></i>
              </p>
            </Link>
            <Link href="/">
              <p className="w-6 mx-1">
                <i className="uil uil-linkedin"></i>
              </p>
            </Link>
            <Link href="/">
              <p className="w-6 mx-1">
                <i className="uil uil-instagram"></i>
              </p>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
