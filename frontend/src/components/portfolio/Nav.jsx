import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { id: "hero", label: "01 · Home" },
  { id: "about", label: "02 · Profile" },
  { id: "skills", label: "03 · Skills" },
  { id: "experience", label: "04 · Experience" },
  { id: "education", label: "05 · Education" },
  { id: "workshop", label: "06 · Workshop" },
  { id: "hobbies", label: "07 · Hobbies" },
  { id: "contact", label: "08 · Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const y = window.scrollY + 200;
      for (let i = links.length - 1; i >= 0; i--) {
        const el = document.getElementById(links[i].id);
        if (el && el.offsetTop <= y) {
          setActive(links[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0A0A0A]/85 backdrop-blur-xl border-b border-[#27272A]"
          : "bg-transparent"
      }`}
      data-testid="main-nav"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 py-4 flex items-center justify-between">
        <button
          onClick={() => scrollTo("hero")}
          className="flex items-center gap-3 group"
          data-testid="nav-logo"
        >
          <svg width="30" height="30" viewBox="0 0 30 30" className="gear-cw">
            <circle cx="15" cy="15" r="9" fill="none" stroke="#FF3B30" strokeWidth="2" />
            {[0, 60, 120, 180, 240, 300].map((a) => (
              <rect
                key={a}
                x="13.5"
                y="1"
                width="3"
                height="6"
                fill="#FF3B30"
                transform={`rotate(${a} 15 15)`}
              />
            ))}
            <circle cx="15" cy="15" r="3" fill="#FF3B30" />
          </svg>
          <span className="font-display text-white text-lg tracking-widest">
            R.D<span className="text-[#FF3B30]">.</span>
          </span>
        </button>

        <div className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              data-testid={`nav-${l.id}`}
              className={`relative px-3 py-2 text-xs font-mono uppercase tracking-widest transition-colors ${
                active === l.id ? "text-white" : "text-[#71717A] hover:text-white"
              }`}
            >
              {l.label}
              {active === l.id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-2 -bottom-0.5 h-0.5 bg-[#FF3B30]"
                />
              )}
            </button>
          ))}
        </div>

        <button
          onClick={() => scrollTo("contact")}
          className="hidden sm:inline-flex items-center gap-2 border border-[#FF3B30] text-[#FF3B30] hover:bg-[#FF3B30] hover:text-white px-4 py-2 text-xs font-mono uppercase tracking-widest transition-colors"
          data-testid="nav-cta"
        >
          <span className="w-1.5 h-1.5 bg-[#FF3B30] rounded-full animate-glow-pulse" />
          Get in touch
        </button>

        <button
          onClick={() => setOpen((o) => !o)}
          className="lg:hidden p-2 text-white"
          data-testid="mobile-menu-toggle"
          aria-label="menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-[#0A0A0A] border-t border-[#27272A] overflow-hidden"
            data-testid="mobile-menu"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {links.map((l) => (
                <button
                  key={l.id}
                  onClick={() => scrollTo(l.id)}
                  data-testid={`mobile-nav-${l.id}`}
                  className={`text-left px-3 py-3 text-sm font-mono uppercase tracking-widest border-l-2 ${
                    active === l.id
                      ? "text-white border-[#FF3B30]"
                      : "text-[#71717A] border-transparent hover:text-white"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
