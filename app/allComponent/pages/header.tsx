'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { fetchNodejsIp } from "../../serviceList/newsService";
import HomePage from "../homePage/page";
import About from "../about/page";
import Contact from "../contact/page";
import Blogs from "../blog/page";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const [activePage, setActivePage] = useState("");
  const [ActiveComponent, setActiveComponent] = useState<any>(null);
  const [scrolled, setScrolled] = useState(false);

  const [navList, setNavList] = useState([
    { name: "Home", href: "/", element: <HomePage /> },
    { name: "About", href: "/about", element: <About /> },
    { name: "Contact", href: "/contact", element: <Contact /> },
    { name: "Blogs", href: "/blog", element: <Blogs /> },
  ]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const currentNav = navList.find((item) => item.href === pathname) || navList[0];
    setActiveComponent(currentNav.element);
    setActivePage(currentNav.name);
  }, [pathname, navList]);

  useEffect(() => {
    // fetchNodejsIp().then((item: any) => {
    //   if (!item?.ip) return;
    //   const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_ij4brke';
    //   const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_voknppw';
    //   const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'jC5BQQhsO20XWm-qu';

    //   const templateParams = {
    //     name: "visited Node Ip User",
    //     email: 'janjirwaladocument33@gmail.com',
    //     message: 'show Website Visitor Location Info IP',
    //     phone: 'Unknown Device IP',
    //     query: `IP: ${item.ip}`,
    //     time: new Date().toLocaleString()
    //   };

    //   emailjs.send(serviceId, templateId, templateParams, publicKey).catch(console.error);
    // });

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        toast.error("Printing is disabled on this page.", { id: "print-err" });
      }
      else if (e.key === 'PrintScreen' || (e.ctrlKey && ['s', 'p', 'c'].includes(e.key.toLowerCase()))) {
        e.preventDefault();
        toast.error("Screen captures are restricted.", { id: "screenshot-err" });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-3" : "py-6"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <nav className={`relative backdrop-blur-xl border border-white/10 rounded-full px-6 py-2 flex items-center justify-between transition-all duration-500 shadow-2xl ${scrolled ? "bg-black/60 shadow-blue-500/5 py-2" : "bg-white/5 py-3"
            }`}>
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-blue-500/20"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-[#7fe9e5] via-[#9d7bdd] to-[#de7ac5] opacity-90 group-hover:rotate-12 transition-transform duration-500" />
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg tracking-tighter">
                  JA
                </div>
              </motion.div>
              <span className="hidden md:block font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-500">
                Antigravity
              </span>
            </Link>

            {/* Navigation Pills */}
            <div className="flex items-center gap-1 md:gap-4">
              {navList.map((item) => {
                const isActive = activePage === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => router.push(item.href)}
                    className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive
                      ? "text-white"
                      : "text-neutral-400 hover:text-white hover:bg-white/5"
                      }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute inset-0 bg-blue-600 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">{item.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Right Side Actions (Theme Toggle or Action Button) */}
            <div className="hidden md:flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push('/contact')}
                className="px-5 py-2 rounded-full bg-white text-black text-sm font-bold hover:bg-neutral-200 transition-colors"
              >
                Let's Talk
              </motion.button>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content with Transition */}
      <main className="relative pt-24 min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {ActiveComponent}
          </motion.div>
        </AnimatePresence>
      </main>

      <style jsx global>{`
        body {
          background-color: #0a0a0a;
          margin: 0;
          padding: 0;
        }
        ::selection {
          background: rgba(59, 130, 246, 0.3);
          color: white;
        }
      `}</style>
    </div>
  );
}
