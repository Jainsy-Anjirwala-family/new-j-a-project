// services/newsService.js

// const NEWS_API_KEY = '7b96fca484bd4784b2b40ace65311ff8';
// const BASE_URL = "https://newsapi.org/v2";
// const NEWS_API_KEY = '6875a6bd8fe67ef7f8b405c8d7eeeddb';
// const BASE_URL = "https://gnews.io/api/v4";
// const NEWS_API_KEY = process.env.NEWS_API_KEY || '7b96fca484bd4784b2b40ace65311ff8';
const NEWS_API_KEY = process.env.GNEWS_API_KEY || '6875a6bd8fe67ef7f8b405c8d7eeeddb';
const BASE_URL = "https://gnews.io/api/v4";
// const BASE_URL = "https://newsapi.org/v2";
// const YT_API_KEY = 'AIzaSyCynJbpZkq0rQ1zD3aE15LTw3nMfDPyMDs';
const YT_API_KEY = process.env.YT_API_KEY || 'AIzaSyCynJbpZkq0rQ1zD3aE15LTw3nMfDPyMDs';
// const YOUTUBE_API_KEY = 'AIzaSyCoD0_astyUx-YBmJdHx-lOHnXfzonzUMI';
const YOUTUBE_API_KEY = 'AIzaSyDOT2s6qzildzIzajuiPTp9cph-aMi5BBU';
export async function getTradingNews() {
  try {
    // const res = await fetch(`${BASE_URL}/everything?q=trading&sortBy=publishedAt&language=en&apiKey=${NEWS_API_KEY}&language=en`);
    const res = await fetch(`${BASE_URL}/search?q=trading&token=${NEWS_API_KEY}&lang=en`);

    if (!res.ok) {
    return [];
    } else{
      const data = await res.json();
      // return NextResponse.json(data.articles);
      return data.articles; // only return articles
    }
  } catch (error) {
    console.error("Error fetching trading news:", error);
    return [];
  }
}

export async function getTechnologyNews() {
  try {
    // const res = await fetch(`${BASE_URL}/top-headlines?category=technology&language=en&pageSize=10&apiKey=${NEWS_API_KEY}`);
    const res = await fetch(`${BASE_URL}/top-headlines?token=${NEWS_API_KEY}&lang=en&category=technology&max=10`);

    if (!res.ok) {
    return [];
    } else{
      const data = await res.json();
      // return NextResponse.json(data.articles);
      return data.articles; // only return articles
    }
  } catch (error) {
    console.error("Error fetching technology news:", error);
    return [];
  }
}


export async function getYoutubeVideos(payload) {
  try {
    const res = await fetch( `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${encodeURIComponent(
          payload.title
        )}&key=${YT_API_KEY}`
    );
      const ytData = await res.json();
      const videoId = ytData.items?.[0]?.id?.videoId || null;
    return {...payload, 'youTubeVideo': videoId}; // only return videoId
    // const result = {...payload, 'youTubeVideo': videoId};
    // return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching technology news:", error);
    return [];
  }
}

export async function fetchNodejsIp() {
  try {
    const res = await   fetch("https://api.ipify.org?format=json")
    return res.json();
  } catch (error) {
    console.error("Error in handler:", error);
    return { error: "Internal Server Error" };
  }
}

export async function fetchYoutubeVideos(payload) {
  try {
      const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${payload.query}&type=video&relevanceLanguage=hi&key=${YOUTUBE_API_KEY}`);
      console.log('response',response);
     const data = await response.json();
     console.log('dats',data.items);
    return data.items;
  } catch (error) {
    console.error("Error fetching technology news:", error);
    return [];
  }
}