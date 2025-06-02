import { Mail, Menu, Phone, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

export function Navbar({ routes }) {
  const [openNav, setOpenNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleResize = () => window.innerWidth >= 960 && setOpenNav(false);

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setScrolled(currentScrollPos > 50);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function to determine active link styles
  const getNavLinkClass = ({ isActive }) =>
    `flex items-center text-gray-700 font-medium text-sm tracking-wide transition-all duration-300 relative group
    ${isActive ? 'text-primary-600' : 'hover:text-primary-600'}
    ${isActive ? 'after:content-[""] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-primary-600 after:to-primary-500 after:rounded-full after:shadow-sm' : 'after:content-[""] after:absolute after:-bottom-1 after:left-1/2 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-primary-600 after:to-primary-500 after:rounded-full after:transition-all after:duration-300 group-hover:after:w-full group-hover:after:left-0'}`;

  return (
    <header className="w-full">
      {/* Top Bar - Hidden on mobile and when scrolled */}
      <div
        className={`bg-gradient-to-r from-gray-900 to-gray-800 text-white transition-all duration-500 hidden md:block w-full z-50 ${
          scrolled ? 'transform -translate-y-full opacity-0' : 'transform translate-y-0 opacity-100'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center h-10">
            <div className="flex space-x-6 text-xs font-medium">
              <a href="/careers" className="hover:text-primary-300 transition-colors duration-200 tracking-wide">
                Careers
              </a>
              <a href="/faqs" className="hover:text-primary-300 transition-colors duration-200 tracking-wide">
                FAQs
              </a>
            </div>

            <div className="flex space-x-6 text-xs font-medium">
              <span className="flex items-center group cursor-pointer">
                <Phone className="w-3.5 h-3.5 mr-2 text-primary-400 group-hover:text-primary-300 transition-colors" />
                <a href="tel:+256778841383" className="hover:text-primary-300 transition-colors duration-200 tracking-wide">+256 759 542772</a>
              </span>
              <span className="flex items-center group cursor-pointer">
                <Mail className="w-3.5 h-3.5 mr-2 text-primary-400 group-hover:text-primary-300 transition-colors" />
                <a href="mailto:operations@vidawm.com" className="hover:text-primary-300 transition-colors duration-200 tracking-wide">operations@vidawm.com</a>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-soft border-b border-gray-100/50 top-0'
            : 'bg-white/90 backdrop-blur-sm md:top-10'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <NavLink to="/" className="flex items-center group">
              <img src="/img/vida.png" alt="vida Logo" className="h-9 w-auto transition-transform duration-300 group-hover:scale-105" />
            </NavLink>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <ul className="flex space-x-6">
                {routes.map(({ name, path }) => (
                  <li key={name} className="relative py-2">
                    <NavLink to={path} className={getNavLinkClass}>
                      {name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Section */}
            <div className="hidden lg:flex items-center">
              <NavLink
                to="/contact"
                className="group relative px-5 py-2.5 text-sm font-medium text-primary-700 transition-all duration-300 overflow-hidden rounded-lg border border-primary-200 hover:border-primary-300 hover:shadow-soft"
              >
                <span className="absolute inset-0 w-0 bg-gradient-to-r from-primary-600 to-primary-500 transition-all duration-300 ease-out group-hover:w-full"></span>
                <span className="relative group-hover:text-white transition-colors duration-300">Contact Us</span>
              </NavLink>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {openNav && (
            <div className="lg:hidden py-4 border-t bg-white/95 backdrop-blur-xl animate-slide-up">
              <ul className="space-y-1">
                {routes.map(({ name, path }) => (
                  <li key={name}>
                    <NavLink
                      to={path}
                      className={({ isActive }) =>
                        `block px-4 py-3 text-gray-700 font-medium text-sm transition-all duration-200 rounded-lg mx-2
                        ${isActive ? 'text-primary-600 bg-primary-50 border-l-4 border-primary-600' : 'hover:text-primary-600 hover:bg-gray-50'}`
                      }
                    >
                      {name}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <div className="mt-4 px-2">
                <NavLink
                  to="/contact"
                  className="block w-full text-center border border-primary-200 text-primary-700 hover:bg-primary-50 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
                >
                  Contact Us
                </NavLink>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

Navbar.defaultProps = {
  routes: []
};

export default Navbar;