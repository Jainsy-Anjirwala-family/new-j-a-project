"use client";
import { useEffect, useState } from "react";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { getTradingNews, fetchYoutubeVideos } from "../../serviceList/newsService";
import toast from "react-hot-toast";

export default function Blog() {
  const [windowHeight, setWindowHeight] = useState(window.innerWidth.toString());
  const [news, setNews] = useState([]);
  let setBtnNameList = [
    {'label': 'trading New', 'value':  'trading+news'},
    {'label': 'trending New', 'value':  'trending+news'},
  ];
  const [btnName, setBtnName] = useState("trading New");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Global route loader
    const start = () => NProgress.start();
    const done = () => NProgress.done();

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", done);
    Router.events.on("routeChangeError", done);

    // Page data loader
    setLoading(true);
    getTradingNews().then((data: any) =>{ data?.length > 0 ? setNews(data): youtubeNewsList({'name': btnName});  data?.length > 0 ? setLoading(false):setLoading(true);  });

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", done);
      Router.events.off("routeChangeError", done);
    };
  }, []);

    function youtubeNewsList(event:any){
        const findName =  setBtnNameList.find((item:any)=> item?.label === event?.name);
        const differenceName = setBtnNameList.find((item:any)=>  item?.label !== event?.name);
        if(findName){
          differenceName ? setBtnName(differenceName.label): null;
          fetchYoutubeVideos({'query': findName?.value}).then((item:any)=>{
            const youtubeList =  item.map((item:any)=>{ 
            item['youTubeIds'] = item?.id?.videoId; item['title'] = item?.snippet?.title;
            item['urlToImage'] = item?.snippet?.thumbnails?.high?.url;
            item['source'] = {
              'name': item?.snippet?.channelTitle
            }
            item?.id?.videoId ? item['url'] = `https://www.youtube.com/watch?v=${item?.id?.videoId}` : null;
              return item;});
            setLoading(false);
            setNews(youtubeList);
          })
        }
      }

  return (
    <div>
      <div className="col-md-12 col-xs-12 col-sm-12 col-lg-12 col-xxl-12 col-xl-12 display-flex">
      <h1>Latest Trading News</h1>
      <button type="button" className="btn btn-info marg-per-l-60" onClick={() => youtubeNewsList({'name': btnName}) } >{btnName}</button>
      </div>
      {loading ? (
        <div className="col-md-12 col-xs-12 col-sm-12 col-lg-12 col-xxl-12 col-xl-12">
          <div className={`${Number(windowHeight) > 990 ? 'dual-ring': 'mobile-dual-ring' }`}>
            <span className={`${Number(windowHeight) > 990 ? 'over-element': 'mobile-over-element' }`}>
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
        </div>
      ) : news?.length > 0 ? (
        <div className="display-grid-sq">
          {news.map((item: any, index: number) => (
            <div key={index} className="">
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  <img
                    src={item?.urlToImage ? item.urlToImage : item?.image ? item.image : '/default-news-image.jpg'}
                    style={{ width: "100%", height: 300, borderRadius: 10 }}
                  />
                </a>
                    <h5>{item.title}</h5>
                <div className="display-flex">
                    <p>{item?.source?.name} - {item?.publishedAt ? new Date(item.publishedAt).toLocaleString() : ''}</p>
                      <a href={item.url} target="_blank" className="marg-per-l-40" rel="noopener noreferrer">
                        Read More
                      </a>
                </div>
            </div>
          ))}
        </div>
      ): !loading && news?.length == 0 ? (
        <h1>No news available.</h1>
      ) : null}

      {/* Skeleton styles */}
      <style jsx>{`
        .dual-ring {
          display: inline-block;
          width: 300px;
          height: 300px;
          margin: 10% 38%;
        }
        .dual-ring:after {
          content: " ";
          display: block;
          width: 282px;
          height: 282px;
          margin: 10% 38%;
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
          margin: 9% 15%;
        }
        .mobile-dual-ring:after {
          content: " ";
          display: block;
          width: 282px;
          height: 282px;
          margin: 9% 15%;
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
