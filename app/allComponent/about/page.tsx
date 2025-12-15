"use client";
import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-hot-toast";
import * as UAParser from "ua-parser-js";
import { getTechnologyNews, getYoutubeVideos, fetchYoutubeVideos } from "../../serviceList/newsService";
import { Swiper, SwiperSlide } from "swiper/react";
import YouTube from "react-youtube";
import Slider from "react-slick";
import { Pagination } from "swiper/modules";
import { Autoplay, Navigation, Keyboard  } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function About() {
  const [windowHeight, setWindowHeight] = useState(window.innerWidth.toString());
  const OtherYoutubeVideos=()=>{
        fetchYoutubeVideos({'query': 'technology'}).then((item:any)=>{
         const youtubeList =  item.map((item:any)=>{ 
          item['youTubeIds'] = item?.id?.videoId; item['title'] = item?.snippet?.title;
          item['description'] = item?.snippet?.description;
          item?.id?.videoId ? item['url'] = `https://www.youtube.com/watch?v=${item?.id?.videoId}` : null;
           return item;})
         setTechnologyNews(youtubeList);
        })
  }
  const [technologyNews, setTechnologyNews] = useState<any[]>([]);
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
        // setTechnologyNews(googleVideos);
        // setLoaderObj({ loading: false });
        console.error(error);
      }
    };
  useEffect(() => {
    setLoaderObj({ loading: true });
    getTechnologyNews().then((data: any) =>{ data?.length > 0 ? returnWithVideo(data) : OtherYoutubeVideos();})
  }, []);

  async  function handleChange(e: any) {
    const parser:any = new UAParser.UAParser();
      if (typeof window !== 'undefined'){
        e.preventDefault();
        const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_ij4brke';
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
    <div className={`${Number(windowHeight) > 990 ? 'display-flex': '' } marg-per-t-4 col-md-12 col-xs-12 col-sm-12 col-lg-12 col-xxl-12 col-xl-12`} >
      <div className={`${Number(windowHeight) > 990 ? 'col-md-12  col-lg-12 col-xxl-12 col-xl-12' : 'col-md-5  col-lg-5 col-xxl-5 col-xl-5'} col-xs-12 col-sm-12 marg-per-l-4`}>
        <button type="button" className="fr" onClick={handleChange}>
           <FontAwesomeIcon icon={faDownload} />
        </button>
        <img
        src="/Jainsy-Anjirwala-cv.jpg" className="ht-vh-80 border-all-px-2 cursor-style-none" 
        onDragStart={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()}  style={{ userSelect: "none" }} />
      </div>
      <div className={`${Number(windowHeight) > 990 ? 'col-md-6 col-lg-6 col-xxl-6 col-xl-6' : 'col-md-12 col-lg-12 col-xxl-12 col-xl-12' }col-xs-12 col-sm-12  ht-pc-40 border-all-px-2 border-radius-px-10 border-color-grey`}>
              {
                technologyNews.length > 0 ? (
                  <Swiper slidesPerView={1} spaceBetween={10}  autoplay={{delay: 2500,disableOnInteraction: false,}}
                        loop={true} modules={[Autoplay]}>
                      {technologyNews.map((article, index) => (
                         <SwiperSlide key={index}>
                          {article.youTubeVideo ? (
                                <YouTube
                                  videoId={article.youTubeVideo}
                                  opts={{
                                    height: String((window.innerHeight / 2)),
                                    width: String((window.innerWidth)),
                                    playerVars: { autoplay: 0 },
                                  }}
                                />
                              ) : article?.youTubeIds ? (
                                <YouTube
                                  videoId={article.youTubeIds}
                                  opts={{
                                    height: String((window.innerHeight / 2)),
                                    width: String((window.innerWidth / 2.0)),
                                    playerVars: { autoplay: 0 },
                                  }}
                                />
                              ) : (
                                <img
                                  src={article.urlToImage || article.image || "/placeholder.png"}
                                  alt={article.title || "no image"}
                                  style={{
                                    width: `${(window.innerWidth)}px`,
                                    height: `${(window.innerHeight / 2)}px`,
                                    objectFit: "cover",
                                  }}
                                />
                              )}
                              <h3 style={{ marginTop: "10px" }}>{article.title}</h3>
                                { article?.description ? (<p>{article.description}</p>): null }
                              <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
                         </SwiperSlide>
                      ))}
                  </Swiper>
                  ):(
                   loaderObj && loaderObj?.loading ? (
                      <div className="col-md-12 col-xs-12 col-sm-12 col-lg-12 col-xxl-12 col-xl-12">
                        <div className={`${Number(windowHeight) > 990 ? 'dual-ring': 'mobile-dual-ring' }`}>
                          <span className={`${Number(windowHeight) > 990 ? 'about-over-element': 'about-mobile-over-element' }`}>
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
        .mobile-dual-ring {
          display: inline-block;
          width: 300px;
          height: 300px;
          margin: 20% 20%;
        }
        .mobile-dual-ring:after {
          content: " ";
          display: block;
          width: 282px;
          height: 282px;
          margin: 20% 20%;
          margin: 1px;
          border-radius: 50%;
          border: 5px solid #3498db;
          border-color: #3498db transparent #3498db transparent;
          animation: mobile-dual-ring 1.2s linear infinite;
        }
        @keyframes mobile-dual-ring {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
    
  );
}