"use client";
import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faNewspaper, faPlayCircle, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-hot-toast";
import * as UAParser from "ua-parser-js";
import { getTechnologyNews, getYoutubeVideos, fetchYoutubeVideos } from "../../serviceList/newsService";
import { Swiper, SwiperSlide } from "swiper/react";
import YouTube from "react-youtube";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function About() {
  const [technologyNews, setTechnologyNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const OtherYoutubeVideos = () => {
    fetchYoutubeVideos({ 'query': 'technology' }).then((item: any) => {
      const youtubeList = item.map((item: any) => {
        item['youTubeIds'] = item?.id?.videoId;
        item['title'] = item?.snippet?.title;
        item['description'] = item?.snippet?.description;
        item?.id?.videoId ? item['url'] = `https://www.youtube.com/watch?v=${item?.id?.videoId}` : null;
        return item;
      })
      setTechnologyNews(youtubeList);
      setLoading(false);
    })
  }

  const returnWithVideo = async (data: any): Promise<void> => {
    const promises = data
      .filter((item: any) => ![undefined, null, ""].includes(item['title']))
      .map((item: any) => getYoutubeVideos(item));

    try {
      const videos = await Promise.all(promises);
      setTechnologyNews(videos);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const disable = (e: any) => e.preventDefault();
    document.addEventListener("contextmenu", disable);
    // document.addEventListener("touchstart", disable, { passive: false }); // Commented out to allow scrolling
    document.addEventListener("keydown", (e: any) => { e.key.includes('Meta') ? e.preventDefault() : null; });

    getTechnologyNews().then((data: any) => {
      if (data?.length > 0) {
        returnWithVideo(data);
      } else {
        OtherYoutubeVideos();
      }
    })
  }, []);

  async function handleDownload(e: any) {
    const parser: any = new UAParser.UAParser();
    if (typeof window !== 'undefined') {
      e.preventDefault();
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_ij4brke';
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_voknppw';
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'jC5BQQhsO20XWm-qu';

      try {
        const deviceDetails: any = parser.getResult();
        const userAgent = navigator.userAgent;
        const isMobile = /Windows/i.test(userAgent) ? 'Windows PC' : /Macintosh/i.test(userAgent) ?
          'Mac PC' : /Android/i.test(userAgent) ? 'Android Mobile' : /iPhone|iPad|iPod/i.test(userAgent) ? 'iOS Mobile' :
            /Linux/i.test(userAgent) ? 'Linux PC' : 'Unknown Device';
        const queryVal = JSON.stringify(deviceDetails);
        const templateParams = {
          name: typeof isMobile === "string" ? isMobile : isMobile ? "Mobile" : "PC",
          email: 'janjirwaladocument33@gmail.com',
          message: 'Downloading CV from About Page',
          phone: isMobile || 'Unknown Device',
          query: queryVal,
          time: new Date().toLocaleString()
        };

        toast.loading("Preparing download...", { id: "download" });
        await emailjs.send(serviceId, templateId, templateParams, publicKey);

        const res = await fetch("/Jainsy-Anjirwala-cv.pdf");
        const blob = await res.blob();
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Jainsy-Anjirwala.pdf");
        document.body.appendChild(link);
        link.click();
        link.remove();
        toast.success("Download Successful!", { id: "download" });
      } catch (err) {
        toast.error("Download Failed!", { id: "download" });
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0a0a0a] to-[#0a0a0a] text-white p-4 md:p-8 pt-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row gap-8"
        >
          {/* Left Column: Profile & CV */}
          <div className="w-full md:w-1/3 space-y-6">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden relative group">
              <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <FontAwesomeIcon icon={faUserAlt} />
                  </div>
                  <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    Profile Preview
                  </h2>
                </div>

                <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[3/4] bg-neutral-900">
                  <img
                    src="/Jainsy-Anjirwala-cv.jpg"
                    alt="CV Preview"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
                    onDragStart={(e) => e.preventDefault()}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDownload}
                  className="w-full mt-6 py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold flex items-center justify-center gap-3 transition-all shadow-lg shadow-blue-500/25"
                >
                  <FontAwesomeIcon icon={faDownload} />
                  Download Resume
                </motion.button>
              </div>
            </div>
          </div>

          {/* Right Column: Technology Hub */}
          <div className="w-full md:w-2/3 space-y-6">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl min-h-[600px] flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                    <FontAwesomeIcon icon={faNewspaper} />
                  </div>
                  <h2 className="text-2xl font-bold">Tech Insights</h2>
                </div>
                {!loading && (
                  <div className="px-4 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-neutral-400">
                    {technologyNews.length} Updates Found
                  </div>
                )}
              </div>

              <div className="flex-1 relative">
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div
                      key="loader"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex flex-col items-center justify-center space-y-4"
                    >
                      <div className="relative w-20 h-20">
                        <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full" />
                        <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                      </div>
                      <p className="text-neutral-400 font-medium animate-pulse">Curating latest tech...</p>
                    </motion.div>
                  ) : technologyNews.length > 0 ? (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="h-full"
                    >
                      <Swiper
                        modules={[Autoplay, Pagination, Navigation]}
                        spaceBetween={24}
                        slidesPerView={1}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        pagination={{ clickable: true, dynamicBullets: true }}
                        navigation={true}
                        className="rounded-2xl overflow-hidden h-full tech-slider"
                      >
                        {technologyNews.map((article, index) => (
                          <SwiperSlide key={index} className="pb-12">
                            <div className="space-y-6">
                              <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/40 aspect-video relative">
                                {article.youTubeVideo || article.youTubeIds ? (
                                  <div className="w-full h-full relative group">
                                    <YouTube
                                      videoId={article.youTubeVideo || article.youTubeIds}
                                      opts={{
                                        width: '100%',
                                        height: '100%',
                                        playerVars: { autoplay: 0, modestbranding: 1 },
                                      }}
                                      className="absolute inset-0"
                                    />
                                    <div className="absolute top-4 right-4 z-10">
                                      <div className="px-3 py-1 rounded-full bg-red-600 text-[10px] font-bold uppercase tracking-wider">
                                        Video
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <img
                                    src={article.urlToImage || article.image || "/placeholder.png"}
                                    alt={article.title}
                                    className="w-full h-full object-cover"
                                  />
                                )}
                              </div>
                              <div className="space-y-3">
                                <h3 className="text-xl md:text-2xl font-bold line-clamp-2 leading-tight">
                                  {article.title}
                                </h3>
                                {article.description && (
                                  <p className="text-neutral-400 line-clamp-3 leading-relaxed">
                                    {article.description}
                                  </p>
                                )}
                                <div className="pt-2">
                                  <a
                                    href={article.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors group"
                                  >
                                    Read Full Insight
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center h-full text-neutral-500 space-y-2"
                    >
                      <FontAwesomeIcon icon={faPlayCircle} className="text-4xl opacity-20" />
                      <p>No insights found in this cycle.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        .tech-slider .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.2);
          opacity: 1;
        }
        .tech-slider .swiper-pagination-bullet-active {
          background: #3b82f6;
          width: 24px;
          border-radius: 4px;
        }
        .tech-slider .swiper-button-next,
        .tech-slider .swiper-button-prev {
          color: white;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(8px);
          width: 48px;
          height: 48px;
          border-radius: 12px;
          border: 1px border rgba(255, 255, 255, 0.1);
        }
        .tech-slider .swiper-button-next:after,
        .tech-slider .swiper-button-prev:after {
          font-size: 18px;
          font-weight: bold;
        }
        @media (max-width: 640px) {
          .tech-slider .swiper-button-next,
          .tech-slider .swiper-button-prev {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
