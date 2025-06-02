import { Typography } from "@material-tailwind/react";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import PropTypes from "prop-types";
import { footerContent } from '../../data/footerContent';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export function Footer({ content = footerContent }) {
  const { title, description, socials, copyright } = content;

  // Minimal essential links
  const essentialLinks = [
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" }
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-primary-600/10 to-accent-600/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-accent-600/10 to-primary-600/10 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>

      {/* Footer Content */}
      <div className="relative z-10 py-8">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Main Row Layout */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            
            {/* Brand Section */}
            <div className="flex-1">
              <div className="flex items-center mb-3">
                <img src="/img/vida.png" alt="vida Logo" className="h-8 w-auto mr-3" />
                <Typography variant="h5" className="text-white font-bold">
                  {title}
                </Typography>
              </div>
              <Typography className="text-gray-300 leading-relaxed text-sm max-w-md">
                {description}
              </Typography>
            </div>

            {/* Quick Links */}
            <div className="flex-shrink-0">
              <ul className="flex flex-col sm:flex-row gap-2 sm:gap-6">
                {essentialLinks.map((item) => (
                  <li key={item.name}>
                    <Typography
                      as="a"
                      href={item.path}
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
                    >
                      {item.name}
                    </Typography>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="flex-shrink-0">
              <div className="flex flex-col sm:flex-row gap-4 text-sm">
                <a href="mailto:operations@vidawm.com" className="text-gray-300 hover:text-primary-300 transition-colors font-medium">
                  operations@vidawm.com
                </a>
                <a href="tel:+256759542772" className="text-gray-300 hover:text-primary-300 transition-colors font-medium">
                  +256 759 542772
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex-shrink-0">
              <div className="flex gap-3">
                {socials.map(({ color, name, path }) => (
                  <a
                    key={name}
                    href={path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-9 h-9 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-white/20 hover:border-white/20 hover:scale-110 transition-all duration-300"
                  >
                    <i className={`fa-brands fa-${name} text-white group-hover:text-primary-300 transition-colors text-sm`} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <Typography className="text-gray-400 text-xs">
              {copyright}
            </Typography>
          </div>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    socials: PropTypes.arrayOf(PropTypes.object).isRequired,
    copyright: PropTypes.string.isRequired,
  })
};

Footer.displayName = "/src/components/layout/Footer.jsx";

export default Footer;