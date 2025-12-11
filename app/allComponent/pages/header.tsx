'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useTheme } from "next-themes";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "../homePage/page";
import About from "../about/page";
import Contact from "../contact/page";
import Blogs from "../blog/page";
import emailjs from "@emailjs/browser";

export default function Header() {
  useEffect(() => {
      const handleClick = (event: MouseEvent) => {      // You can add more logic here, e.g., analytics, custom behavior
        if(navList.find((item:any) => item?.href && window.location.href.includes(item?.href))?.name === 'Home'){
          const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_ij4brke';
          const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_voknppw';
          const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'jC5BQQhsO20XWm-qu';
          navigator.geolocation ?
          navigator.geolocation.getCurrentPosition(
            (position) => {   
                const templateParams = {
                  name: "visited User",
                  email: 'janjirwaladocument33@gmail.com',
                  message: 'show Website Visitor Location Info',
                  phone: 'Unknown Device',
                  query: `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`,
                  time: new Date().toLocaleString()
                };
      
                const result =  emailjs.send(serviceId, templateId, templateParams, publicKey);
            },
            (err) => {
            }
          ): null;
        }
      };
      document.addEventListener("click", handleClick);
       const channel = new BroadcastChannel("tabs");
      const handleKeyDown = (e: KeyboardEvent) => {
        // Check for Ctrl+P (Windows/Linux) or Cmd+P (Mac)
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
          e.preventDefault(); // Stop the print dialog
          toast.error("you cannot print this page!");
          setTimeout(() => {
            toast.dismiss();
          }, 1000);
        }
        else if (e.key === 'PrintScreen' || 
        (e.ctrlKey && ['s', 'p', 'c'].includes(e.key.toLowerCase()))) {
          e.preventDefault(); // Stop the print dialog
          toast.error("you cannot Screen Shot Of this page!");
          setTimeout(() => {
            toast.dismiss();
          }, 1000);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, []);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const [activePage, setActivePage] = useState("");
  const [ActiveComponent, setActiveComponent] = useState("");
  const [navList, setNavList] = useState([
    { name: "Home", href: "/", isActive: false, element: <HomePage />  },
    { name: "About", href: "/about", isActive: false,  element: <About />  },
    { name: "Contact", href: "/contact", isActive: false, element: <Contact />  },
    { name: "Blogs", href: "/blog", isActive: false, element: <Blogs />  },
  ]);
  // Update active nav item whenever path changes.
  // If the current pathname doesn't match any nav item, mark Home active and
  // replace the URL to `/` (client-side) to avoid navigation loops.
  useEffect(() => {
    // Compute updated nav list based on pathname
    const updated = navList.map((item:any) => ({ ...item, isActive: item.href === pathname }));
    const activePageDetails = updated.find((item:any) => item.isActive) || { name: "Home", element: <HomePage /> };
    setActiveComponent(activePageDetails.element);
    setActivePage(activePageDetails.name);
    setNavList(updated);
  }, [pathname, router]);

  // Track client mount to avoid rendering client-only attributes during SSR
  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  // Handle browser back/forward buttons safely
  // useEffect(() => {
  //   if (typeof window === 'undefined') return;

  //   const handlePopState = () => {
  //     const currentPath = window.location?.pathname ?? pathname;
  //     setNavList(prev =>
  //       prev.map(item => ({
  //         ...item,
  //         isActive: item.href === currentPath
  //       }))
  //     );
  //   };

  //   window.addEventListener('popstate', handlePopState);

  //   return () => window.removeEventListener('popstate', handlePopState);
  // }, [pathname]);

  return (
    <div className="col-md-12 col-sm-12 col-xs-12 col-lg-12">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid display-flex">
          <div className="col-md-1 col-sm-1 col-xs-1 col-lg-1">
            <a className="" href="/">
              <svg width="50" height="50" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" className="border-radius-px-140">
                <defs>
                  <linearGradient id="jaGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7fe9e5ff" />   {/* Red */}
                    <stop offset="25%" stopColor="#91b7e7ff" />  {/* Orange */}
                    <stop offset="50%" stopColor="#9d7bddff" />  {/* Yellow */}
                    <stop offset="75%" stopColor="#de7ac5ff" />  {/* Green */}
                    <stop offset="100%" stopColor="#88c1dfff" /> {/* Blue */}
                  </linearGradient>
                </defs>
                <rect width="300" height="300" rx="40" fill="url(#jaGradient)"  />
                <text
                  x="50%"
                  y="55%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fontSize="150"
                  fill="white"
                  fontFamily="Arial"
                  fontWeight="bold"
                >
                  JA
                </text>
              </svg>
            </a>
          </div>
          <div className="col-md-11 col-sm-11 col-xs-11 col-lg-11">
            <ul className="nav nav-underline">
              {navList.map((item, index) => (
                <li key={index} className="nav-item">
                    <button key={item.name} onClick={() => { router.push(item.href); }}
                      className={`nav-link text-black ${item.name && item.name === activePage ? 'active' : ''}`}
                      style={{ fontWeight: activePage === item.name ? "bold" : "normal", marginRight: "1rem" }}>
                      {item.name}
                    </button>
                   {/* <Routes>
                    <Route path={item.href} element={item.element} />
                    {item.name}
                   </Routes> */}
                   {/* <Link href={item.href} className={`nav-link text-black ${item.isActive && mounted ? 'active' : ''}`} >
                        {item.name}
                    </Link> */}

                  {/* <Link 
                    className={`nav-link text-black ${item.isActive && mounted ? 'active' : ''}`}  
                    href={item.href}
                  >
                    {item.name}
                  </Link> */}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
       <main>
        {ActiveComponent}
      </main>
    </div>

  );
}
