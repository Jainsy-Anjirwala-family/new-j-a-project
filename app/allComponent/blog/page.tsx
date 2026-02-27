"use client";
import { useEffect, useState } from "react";
import { getTradingNews, fetchYoutubeVideos } from "../../serviceList/newsService";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faClock, faNewspaper, faBolt, faPlay } from '@fortawesome/free-solid-svg-icons';

export default function Blog() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("trading New");

  const newsCategories = [
    { label: 'Trading', value: 'trading New', q: 'trading+news' },
    { label: 'Trending', value: 'trending New', q: 'trending+news' },
  ];

  useEffect(() => {
    setLoading(true);
    getTradingNews().then((data: any) => {
      if (data?.length > 0) {
        setNews(data);
        setLoading(false);
      } else {
        fetchNewsByCategory(activeTab);
      }
    });
  }, []);

  const fetchNewsByCategory = (categoryValue: string) => {
    setLoading(true);
    const category = newsCategories.find(c => c.value === categoryValue);
    if (!category) return;

    fetchYoutubeVideos({ query: category.q }).then((item: any) => {
      const youtubeList = item.map((video: any) => ({
        ...video,
        id: video.id?.videoId,
        title: video.snippet?.title,
        urlToImage: video.snippet?.thumbnails?.high?.url,
        source: { name: video.snippet?.channelTitle },
        url: `https://www.youtube.com/watch?v=${video.id?.videoId}`,
        publishedAt: video.snippet?.publishedAt,
        isYoutube: true
      }));
      setNews(youtubeList);
      setLoading(false);
    });
  };

  const handleTabChange = (category: any) => {
    setActiveTab(category.value);
    fetchNewsByCategory(category.value);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0a0a0a] to-[#0a0a0a] text-white pt-24 pb-12 px-4 md:px-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
              Market Intelligence
            </h1>
            <p className="text-neutral-400 text-lg">
              Stay ahead with real-time news and expert analysis.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex bg-white/5 backdrop-blur-md p-1 rounded-2xl border border-white/10 self-start md:self-auto"
          >
            {newsCategories.map((category) => (
              <button
                key={category.value}
                onClick={() => handleTabChange(category)}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${activeTab === category.value
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                  }`}
              >
                <FontAwesomeIcon icon={category.label === 'Trading' ? faBolt : faNewspaper} className="w-3 h-3" />
                {category.label}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {loading ? (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-[450px] rounded-[2rem] bg-white/5 animate-pulse border border-white/5" />
          ))}
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {news.map((item: any) => (
              <motion.div
                key={item.id || item.url}
                variants={cardVariants}
                layout
                whileHover={{ y: -8 }}
                className="group relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden flex flex-col transition-all hover:bg-white/10 hover:border-blue-500/30 shadow-2xl"
              >
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.urlToImage || '/default-news-image.jpg'}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />

                  {item.isYoutube && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-xl animate-pulse">
                        <FontAwesomeIcon icon={faPlay} className="text-white ml-1" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-wider rounded-lg border border-blue-500/20">
                      {item.source?.name || "News Source"}
                    </span>
                    <span className="flex items-center gap-1.5 text-neutral-500 text-[11px]">
                      <FontAwesomeIcon icon={faClock} className="w-2.5 h-2.5" />
                      {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : 'Recent'}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold leading-tight mb-4 group-hover:text-blue-400 transition-colors line-clamp-2">
                    {item.title}
                  </h3>

                  <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-white hover:text-blue-400 transition-colors flex items-center gap-2 group/btn"
                    >
                      Read Full Article
                      <FontAwesomeIcon
                        icon={faExternalLinkAlt}
                        className="w-3 h-3 translate-y-0 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform"
                      />
                    </a>
                  </div>
                </div>

                {/* Subtle Hover Glow */}
                <div className="absolute -inset-px bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-[2rem]" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {!loading && news?.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-24"
        >
          <div className="text-6xl mb-6">🔍</div>
          <h2 className="text-2xl font-bold text-white mb-2">No updates found</h2>
          <p className="text-neutral-500">Check back later for high-frequency market updates.</p>
        </motion.div>
      )}
    </div>
  );
}
