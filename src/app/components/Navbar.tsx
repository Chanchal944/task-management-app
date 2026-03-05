import { useState, useEffect } from "react";
import { LogOut, User, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router";

interface NavbarProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
  onLogout: () => void;
}

export function Navbar({ onLoginClick, onRegisterClick, onLogout }: NavbarProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check session storage for logged in user
    checkLoginStatus();
  }, []);

  // Function to check login status
  const checkLoginStatus = () => {
    const sessionUser = sessionStorage.getItem("loggedInUser");
    if (sessionUser) {
      const user = JSON.parse(sessionUser);
      setIsLoggedIn(true);
      setUserName(user.name);
    } else {
      setIsLoggedIn(false);
      setUserName("");
    }
  };

  // Listen to storage events to update login status across components
  useEffect(() => {
    const handleStorageChange = () => {
      checkLoginStatus();
    };

    window.addEventListener("storage", handleStorageChange);
    // Custom event for same-window updates
    window.addEventListener("loginStatusChange", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("loginStatusChange", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    onLogout();
    setIsLoggedIn(false);
    setUserName("");
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/task", label: "Task" },
    { path: "/filtering", label: "Filtering" },
    { path: "/dashboard", label: "Dashboard" },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link
  to="/"
  className="flex items-center"
  onClick={() => setMobileMenuOpen(false)}
>
  <img
    src="/img/main-logo.png"
    alt="Logo"
    className="w-52 h-auto object-contain"
  />
</Link>
          {/* Desktop Navigation Links - Center */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors hover:text-blue-200 ${
                  location.pathname === link.path
                    ? "text-white border-b-2 border-white pb-1"
                    : "text-blue-100"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons - Right */}
          <div className="hidden md:flex items-center gap-2">
            {isLoggedIn ? (
              <>
                <div className="flex items-center gap-2 bg-blue-800 px-3 py-1.5 rounded-lg">
                  <User className="w-4 h-4" />
                  <span className="font-medium text-sm">{userName}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white font-medium px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2 text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={onLoginClick}
                  className="bg-white text-blue-600 hover:bg-blue-50 font-medium px-3 py-1.5 rounded-lg transition-colors text-sm"
                >
                  Login
                </button>
                <button
                  onClick={onRegisterClick}
                  className="bg-blue-800 hover:bg-blue-900 text-white font-medium px-3 py-1.5 rounded-lg transition-colors text-sm"
                >
                  Register
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute left-0 right-0 top-full bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg z-50">
            <div className="flex flex-col gap-4 px-4 py-4">
              {/* Mobile Nav Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-medium transition-colors hover:text-blue-200 ${
                    location.pathname === link.path
                      ? "text-white border-b-2 border-white pb-1"
                      : "text-blue-100"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Auth Buttons */}
              <div className="flex flex-col gap-2 pt-2">
                {isLoggedIn ? (
                  <>
                    <div className="flex items-center gap-2 bg-blue-800 px-3 py-2 rounded-lg">
                      <User className="w-4 h-4" />
                      <span className="font-medium text-sm">{userName}</span>
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white font-medium px-3 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        onLoginClick();
                        setMobileMenuOpen(false);
                      }}
                      className="bg-white text-blue-600 hover:bg-blue-50 font-medium px-3 py-2 rounded-lg transition-colors text-sm"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        onRegisterClick();
                        setMobileMenuOpen(false);
                      }}
                      className="bg-blue-800 hover:bg-blue-900 text-white font-medium px-3 py-2 rounded-lg transition-colors text-sm"
                    >
                      Register
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
