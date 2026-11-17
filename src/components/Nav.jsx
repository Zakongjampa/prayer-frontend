import { useState } from "react";
import { LogOut, Menu, Search, User, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { unsetLocalStorage } from "../utils/storage";
import SearchOverlay from "./SearchOverlay";

export default function Nav({ userId, setUserId }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { pathname } = useLocation();

  const closeMenu = () => setMenuOpen(false);
  const closeSearch = () => setSearchOpen(false);
  const searchScope = pathname.startsWith("/books")
    ? "books"
    : pathname.startsWith("/prayer")
      ? "prayers"
      : "all";

  const handleLogOut = () => {
    unsetLocalStorage();
    setUserId(null);
    closeMenu();
  };

  return (
    <nav className="w-full">
      <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link
            className="shrink-0 text-2xl text-white !no-underline hover:!no-underline sm:text-3xl lg:text-4xl"
            to="/"
            onClick={closeMenu}
          >
            ཞལ་འདོན་དཔེ་ཆ།
          </Link>

          <div className="hidden items-center gap-3 md:flex">
            <div className="flex items-center gap-2">
              <Link
                className="rounded-full px-4 py-2 font-semibold text-[#f4e9d2] !no-underline transition hover:bg-[#eed8b317] hover:!text-[#fff7ea]"
                to="/prayers"
              >
                Prayers
              </Link>
              <Link
                className="rounded-full px-4 py-2 font-semibold text-[#f4e9d2] !no-underline transition hover:bg-[#eed8b317] hover:!text-[#fff7ea]"
                to="/books"
              >
                Books
              </Link>
            </div>
            <button
              className="inline-flex size-10 items-center justify-center rounded-full border border-[#fff6e08c] bg-[#e8d5b0] text-[#783b30] shadow-[0_4px_12px_rgba(8,3,4,0.2)] transition duration-150 hover:bg-[#f4e8cf] hover:text-[#5f2d26] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d3a77c]"
              type="button"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
            >
              <Search size={20} strokeWidth={2.25} aria-hidden="true" />
            </button>

            {userId != null ? (
              <div className="flex items-center justify-center gap-3 text-[#f4e9d2]">
                <User size={25} aria-hidden="true" />
                <span className="text-lg font-semibold">
                  {localStorage.getItem("username")}
                </span>
                <button
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#783b30] px-4 py-2 text-sm font-semibold text-[#fff7ea] shadow-[0_5px_14px_rgba(74,31,25,0.22)] transition duration-150 hover:bg-[#5f2d26] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d3a77c]"
                  type="button"
                  onClick={handleLogOut}
                >
                  <LogOut size={16} aria-hidden="true" />
                  Log out
                </button>
              </div>
            ) : (
              <Link
                className="rounded-full bg-[#783b30] px-5 py-2 font-semibold text-[#fff7ea] !no-underline transition hover:bg-[#5f2d26] hover:text-[#fff7ea] hover:!no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bd795e]"
                to="/login"
              >
                Login
              </Link>
            )}
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-[#fff6e08c] bg-[#e8d5b0] text-[#783b30] shadow-[0_4px_12px_rgba(8,3,4,0.2)] transition duration-150 hover:bg-[#f4e8cf] hover:text-[#5f2d26] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d3a77c]"
              type="button"
              aria-label="Search"
              onClick={() => {
                closeMenu();
                setSearchOpen(true);
              }}
            >
              <Search size={20} strokeWidth={2.25} aria-hidden="true" />
            </button>
            <button
              className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-[#eed8b352] text-[#f4e9d2] transition hover:bg-[#eed8b317] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d3a77c]"
              type="button"
              aria-controls="mobile-navigation"
              aria-expanded={menuOpen}
              aria-label={
                menuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              onClick={() => setMenuOpen((isOpen) => !isOpen)}
            >
              {menuOpen ? (
                <X size={21} aria-hidden="true" />
              ) : (
                <Menu size={21} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        <div
          className={`${menuOpen ? "block" : "hidden"} pt-4 md:hidden`}
          id="mobile-navigation"
        >
          <div className="rounded-2xl border border-[#eed8b333] bg-[#2a1619] p-3 shadow-[0_16px_40px_rgba(8,3,4,0.3)]">
            <Link
              className="block rounded-xl px-4 py-3 font-semibold text-[#f4e9d2] !no-underline transition hover:bg-[#eed8b317] hover:!text-[#fff7ea]"
              to="/prayers"
              onClick={closeMenu}
            >
              Prayers
            </Link>
            <Link
              className="block rounded-xl px-4 py-3 font-semibold text-[#f4e9d2] !no-underline transition hover:bg-[#eed8b317] hover:!text-[#fff7ea]"
              to="/books"
              onClick={closeMenu}
            >
              Books
            </Link>

            <div className="my-2 border-t border-[#eed8b333]" />

            {userId != null ? (
              <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 text-[#f4e9d2]">
                <span className="inline-flex items-center gap-2 font-semibold">
                  <User size={20} aria-hidden="true" />
                  {localStorage.getItem("username")}
                </span>
                <button
                  className="inline-flex items-center gap-2 rounded-full bg-[#783b30] px-4 py-2 text-sm font-semibold text-[#fff7ea] transition hover:bg-[#5f2d26] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d3a77c]"
                  type="button"
                  onClick={handleLogOut}
                >
                  <LogOut size={16} aria-hidden="true" />
                  Log out
                </button>
              </div>
            ) : (
              <Link
                className="block rounded-xl px-4 py-3 font-semibold text-[#f4e9d2] !no-underline transition hover:bg-[#eed8b317] hover:!text-[#fff7ea]"
                to="/login"
                onClick={closeMenu}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
      {searchOpen && (
        <SearchOverlay scope={searchScope} onClose={closeSearch} />
      )}
    </nav>
  );
}
