import { Gavel, Search, Heart, User } from "lucide-react";

const footerItems = [
  { icon: Gavel, label: "My Auctions" },
  { icon: Search, label: "Search" },
  { icon: Heart, label: "Saved" },
  { icon: User, label: "My Profile" },
];

const Footer = () => {
  return (
    <>
      {/* Mobile Fixed Footer */}
      <footer className="mobile-footer md:hidden">
        <div className="flex items-center justify-around">
          {footerItems.map((item) => (
            <button key={item.label} className="footer-item text-primary-foreground">
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </footer>

      {/* Desktop Footer */}
      <footer className="desktop-footer hidden md:block mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-12 lg:gap-16">
            {footerItems.map((item) => (
              <button
                key={item.label}
                className="footer-item text-primary-foreground flex-row gap-2"
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>
          <div className="text-center mt-4 pt-4 border-t border-primary-foreground/20">
            <p className="text-primary-foreground/80 text-xs">
              © 2025 Caarzy. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
