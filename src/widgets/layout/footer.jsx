// src/components/layout/Footer.jsx

import { Typography } from "@material-tailwind/react";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ArrowRight, Mail } from 'lucide-react';
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
  const { title, description, officeInfo, newsletter, socials, menus, copyright } = content;

  return (
    <footer className="relative">

      {/* Newsletter Section */}
      <div className="bg-[#f0f2f2]">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-[#023a2f] p-8 rounded-lg">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="bg-yellow-400 p-3 rounded">
                  <Mail className="w-6 h-6 text-[#012920]" />
                </div>
                <Typography variant="h6" color="white">
                  {newsletter.title}<br />
                  {newsletter.subtitle}
                </Typography>
              </div>
              <div className="flex w-full md:w-auto gap-2">
                <input
                  type="email"
                  placeholder={newsletter.placeholder}
                  className="flex-grow md:w-80 px-4 py-2.5 rounded bg-white/10 text-white placeholder-white/60 border border-white/20"
                />
                <button className="bg-white text-[#012920] px-6 py-2.5 rounded flex items-center gap-2 hover:bg-white/90 transition-colors">
                  {newsletter.buttonText}
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="bg-[#012920] pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
              <Typography variant="h4" color="white" className="mb-4">
                {title}
              </Typography>
              <Typography variant="small" className="text-white/70 mb-6">
                {description}
              </Typography>
              <div className="flex gap-3">
                {socials.map(({ color, name, path }) => (
                  <a
                    key={name}
                    href={path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <i className={`fa-brands fa-${name} text-${color}`} />
                  </a>
                ))}
              </div>
            </div>

            {menus.map(({ name, items }) => (
              <div key={name}>
                <Typography variant="small" color="white" className="mb-4 font-medium uppercase">
                  {name}
                </Typography>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item.name}>
                      <Typography
                        as="a"
                        href={item.path}
                        color="white"
                        className="text-white/70 hover:text-white transition-colors text-sm"
                      >
                        {item.name}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <hr className="my-8 border-white/10" />

          <Typography className="text-center text-white/70 text-sm">
            {copyright}
          </Typography>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    officeInfo: PropTypes.object.isRequired,
    newsletter: PropTypes.object.isRequired,
    socials: PropTypes.arrayOf(PropTypes.object).isRequired,
    menus: PropTypes.arrayOf(PropTypes.object).isRequired,
    copyright: PropTypes.string.isRequired,
  })
};

Footer.displayName = "/src/components/layout/Footer.jsx";

export default Footer;