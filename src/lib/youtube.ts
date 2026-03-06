export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  viewCount: string;
}

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

export async function getLatestVideos(): Promise<YouTubeVideo[]> {
  if (!YOUTUBE_API_KEY) {
    console.warn("YOUTUBE_API_KEY not set, returning empty array");
    return [];
  }

  try {
    // First, get the channel's upload playlist
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forHandle=DrGregShow&key=${YOUTUBE_API_KEY}`,
      { next: { revalidate: 7200 } } // 2 hours ISR
    );
    const channelData = await channelRes.json();
    const uploadsPlaylistId =
      channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;

    if (!uploadsPlaylistId) return [];

    // Get latest videos from uploads playlist
    const videosRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=4&playlistId=${uploadsPlaylistId}&key=${YOUTUBE_API_KEY}`,
      { next: { revalidate: 7200 } }
    );
    const videosData = await videosRes.json();

    if (!videosData.items) return [];

    const videoIds = videosData.items
      .map((item: any) => item.snippet.resourceId.videoId)
      .join(",");

    // Get view counts
    const statsRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`,
      { next: { revalidate: 7200 } }
    );
    const statsData = await statsRes.json();

    const statsMap = new Map<string, string>();
    statsData.items?.forEach((item: any) => {
      statsMap.set(item.id, item.statistics.viewCount || "0");
    });

    return videosData.items.map((item: any) => ({
      id: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      thumbnail:
        item.snippet.thumbnails.high?.url ||
        item.snippet.thumbnails.medium?.url,
      publishedAt: item.snippet.publishedAt,
      viewCount: statsMap.get(item.snippet.resourceId.videoId) || "0",
    }));
  } catch (error) {
    console.error("YouTube API error:", error);
    return [];
  }
}
