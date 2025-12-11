"use client";
import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-hot-toast";
import * as UAParser from "ua-parser-js";
import { getTechnologyNews, getYoutubeVideos } from "../../serviceList/newsService";
import { Swiper, SwiperSlide } from "swiper/react";
import YouTube from "react-youtube";
import "swiper/css";

export default function About() {
  const [technologyNews, setTechnologyNews] = useState<any[]>([]);
  const [mediaHeight, setMediaHeight] = useState<number>(600);
  const [loaderObj, setLoaderObj] = useState({loading: false});
   const returnWithVideo = async (data:any): Promise<void> => {
      const promises = data
        .filter((item:any) => ![undefined, null, ""].includes(item['title']))
        .map((item:any) => getYoutubeVideos(item));

      try {
        const videos = await Promise.all(promises);
        // setLoaderObj({ loading: false });
        setTechnologyNews(videos);
      } catch (error) {
        // setLoaderObj({ loading: false });
        console.error(error);
      }
    };
  useEffect(() => {
    setLoaderObj({ loading: true });
    getTechnologyNews().then((data: any) =>{ returnWithVideo(data);})
  }, []);

  useEffect(() => {
    const calcHeight = () => {
      if (typeof window === 'undefined') return;
      const w = window.innerWidth;
      if (w < 576) setMediaHeight(220);
      else if (w < 768) setMediaHeight(300);
      else if (w < 992) setMediaHeight(360);
      else if (w < 1200) setMediaHeight(460);
      else setMediaHeight(600);
    };
    calcHeight();
    window.addEventListener('resize', calcHeight);
    return () => window.removeEventListener('resize', calcHeight);
  }, []);
  async  function handleChange(e: any) {
    const parser:any = new UAParser.UAParser();
      if (typeof window !== 'undefined'){
        e.preventDefault();
        const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_j88zgkk';
        const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_voknppw';
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'jC5BQQhsO20XWm-qu';

        // Simple validation with clearer diagnostics (no secret values printed)
        const missing: string[] = [];
        if (!serviceId) missing.push('NEXT_PUBLIC_EMAILJS_SERVICE_ID');
        if (!templateId) missing.push('NEXT_PUBLIC_EMAILJS_TEMPLATE_ID');
        if (!publicKey) missing.push('NEXT_PUBLIC_EMAILJS_PUBLIC_KEY');
        if (missing.length > 0) {
          const msg = `EmailJS not configured. Missing env: ${missing.join(', ')}`;
          console.error(msg);
          if (typeof window !== 'undefined') alert(msg);
          return;
        }
        try {
          const deviceDetails:any = parser.getResult();
          const userAgent = navigator.userAgent;
          const isMobile = /Windows/i.test(userAgent) ? 'Windows PC': /Macintosh/i.test(userAgent) ?
          'Mac PC': /Android/i.test(userAgent) ? 'Android Mobile': /iPhone|iPad|iPod/i.test(userAgent) ? 'iOS Mobile' :
          /Linux/i.test(userAgent) ? 'Linux PC' : 'Unknown Device';
          const queryVal  = JSON.stringify(deviceDetails);
          const templateParams = {
            name: typeof isMobile === "string" ? isMobile : isMobile ? "Mobile" : "PC",
            email: 'janjirwaladocument33@gmail.com',
            message: 'Downloading CV from About Page',
            phone: isMobile || 'Unknown Device',
            query: queryVal,
            time: new Date().toLocaleString()
          };

          const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
          const res = await fetch("./public/Jainsy-Anjirwala-cv.pdf");
          const blob = await res.blob();
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Jainsy-Anjirwala.pdf");
          document.body.appendChild(link);
          link.click();
          link.remove();
          toast.success("Download Successfully!");
        } catch (err) {
          toast.error("Fail To Download!");
        } 
        setTimeout(() => {
          toast.dismiss();
        }, 5000);
      }
    }

  return (
    <div className="col-md-12 col-xs-12 col-sm-12 col-lg-12 col-xxl-12 col-xl-12 display-flex marg-per-t-4">
      <div className="col-md-5 col-xs-12 col-sm-12 col-lg-5 col-xxl-5 col-xl-5 marg-per-l-4">
        <button type="button" className="fr" onClick={handleChange}>
           <FontAwesomeIcon icon={faDownload} />
        </button>
        <img
        src="/Jainsy-Anjirwala-cv.jpg" className="ht-vh-80 border-all-px-2 cursor-style-none" 
        onDragStart={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()}  style={{ userSelect: "none" }} />
      </div>
      <div className="col-md-6 col-xs-12 col-sm-12 col-lg-6 col-xxl-6 col-xl-6 border-all-px-2 border-radius-px-10 border-color-grey">
              {
                technologyNews.length > 0 ? (
                  <div id="carouselExample" className="carousel slide">
                        <div className="carousel-inner">
                          {technologyNews.map((item: any, index: number) => ( 
                            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`} > 
                              {item?.youTubeVideo ? (
                                  <YouTube
                                    videoId={item.youTubeVideo}
                                    opts={{ height: String(mediaHeight), width: '100%', playerVars: { autoplay: 0 } }}
                                    className="d-block w-100"
                                  />
                              ) : (
                                <img
                                  src={item?.urlToImage ? item.urlToImage : item?.image ? item.image : '/default-news-image.jpg'}
                                  className="d-block w-100"
                                  alt="no image"
                                  style={{ width: '100%', height: `${mediaHeight}px`, objectFit: 'cover' }}
                                />
                              )}
                              <h5>{item.title}</h5> 
                            </div>))
                          }</div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                      <span className="carousel-control-next-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                  ):(
                    loaderObj && loaderObj?.loading ? (
                      <div className="col-md-12 col-xs-12 col-sm-12 col-lg-12 col-xxl-12 col-xl-12">
                        <div className="dual-ring">
                          <span className="about-over-element">
                            <svg width="200" height="200" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" className="border-radius-px-140">
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
                          </span>
                        </div>
                      </div>):(
                      <div className="marg-per-l-7 marg-per-t-20"> 
                        <p className="fs-100">No technology news available.</p>
                      </div>
                      )
                  )
              }
      </div>
      {/* Skeleton styles */}
      <style jsx>{`
        .dual-ring {
          display: inline-block;
          width: 300px;
          height: 300px;
          margin: 20% 25%;
        }
        .dual-ring:after {
          content: " ";
          display: block;
          width: 282px;
          height: 282px;
          margin: 20% 25%;
          margin: 1px;
          border-radius: 50%;
          border: 5px solid #3498db;
          border-color: #3498db transparent #3498db transparent;
          animation: dual-ring 1.2s linear infinite;
        }
        @keyframes dual-ring {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
    
  );
}