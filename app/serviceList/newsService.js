// services/newsService.js

// const NEWS_API_KEY = '7b96fca484bd4784b2b40ace65311ff8';
// const BASE_URL = "https://newsapi.org/v2";
// const NEWS_API_KEY = '6875a6bd8fe67ef7f8b405c8d7eeeddb';
// const BASE_URL = "https://gnews.io/api/v4";
const NEWS_API_KEY = process.env.NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2";
// const YT_API_KEY = 'AIzaSyCynJbpZkq0rQ1zD3aE15LTw3nMfDPyMDs';
const YT_API_KEY = process.env.YT_API_KEY;
export async function getTradingNews() {
  try {
    const res = await fetch(`${BASE_URL}/everything?q=trading&sortBy=publishedAt&language=en&apiKey=${NEWS_API_KEY}&language=en`);

    if (!res.ok) {
      throw new Error("Failed to fetch trading news");
    }

    const data = await res.json();
    return data.articles; // only return articles
  } catch (error) {
    console.error("Error fetching trading news:", error);
    return [];
  }
}

export async function getTechnologyNews() {
  try {
    const res = await fetch(`${BASE_URL}/top-headlines?category=technology&language=en&pageSize=10&apiKey=${NEWS_API_KEY}`);

    if (!res.ok) {
      throw new Error("Failed to fetch technology news");
    }

    const data = await res.json();
    return data.articles; // only return articles
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
  } catch (error) {
    console.error("Error fetching technology news:", error);
    return [];
  }
}
