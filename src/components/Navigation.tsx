import { NavLink } from "react-router-dom";
import { useState } from "react";

function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function toggleMobileMenu(): void {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  function closeMobileMenu(): void {
    setIsMobileMenuOpen(false);
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <NavLink
            to="/"
            onClick={closeMobileMenu}
            className="text-2xl font-bold text-blue-600"
          >
            <span className="md:hidden">💼</span>
            <span className="hidden md:inline">💼 JobBoard</span>
          </NavLink>

          {/* Desktop Navigation - hidden on mobile */}
          <div className="hidden md:flex gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
                  : "text-gray-600 hover:text-blue-600 transition pb-1"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/jobs"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
                  : "text-gray-600 hover:text-blue-600 transition pb-1"
              }
            >
              Jobs
            </NavLink>

            <NavLink
              to="/saved"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
                  : "text-gray-600 hover:text-blue-600 transition pb-1"
              }
            >
              Saved Jobs
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
                  : "text-gray-600 hover:text-blue-600 transition pb-1"
              }
            >
              About
            </NavLink>
          </div>

          {/* Mobile button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-gray-600 hover:text-blue-600 p-2"
            aria-label="Toggle Menu"
          >
            <div
              className={`transition-transform duration-300 ${
                isMobileMenuOpen ? "rotate-90" : "rotate-0"
              }`}
            >
              {isMobileMenuOpen ? (
                // X icon when menu is open
                <svg
                  className="w-6 h-6 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // Burger icon when menu is closed
                <svg
                  className="w-6 h-6 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </div>
          </button>
        </div>
        {/* Mobile Menu Dropdown - Only visible on mobile when open */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4 animate-slideDown">
            <div className="flex flex-col gap-4">
              <NavLink
                to="/"
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-semibold py-2 px-4 bg-blue-50 rounded"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-50 py-2 px-4 rounded transition"
                }
              >
                🏠 Home
              </NavLink>
              <NavLink
                to="/jobs"
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-semibold py-2 px-4 bg-blue-50 rounded"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-50 py-2 px-4 rounded transition"
                }
              >
                💼 Jobs
              </NavLink>
              <NavLink
                to="/saved"
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-semibold py-2 px-4 bg-blue-50 rounded"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-50 py-2 px-4 rounded transition"
                }
              >
                💾 Saved Jobs
              </NavLink>
              <NavLink
                to="/about"
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-semibold py-2 px-4 bg-blue-50 rounded"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-50 py-2 px-4 rounded transition"
                }
              >
                ℹ️ About
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
