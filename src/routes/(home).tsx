import { cache, createAsync } from "@solidjs/router";
import { getMovie, getTrending, getTvShow } from "~/services/tmdbAPI";

const getTrendingMovies = cache(async () => {
  return await getTrending("movie");
}, "trending-movies");

const getTrendingTv = cache(async () => {
  return await getTrending("tv");
}, "trending-tv");

const getFeaturedMedia = cache(
  async ({
    id,
    mediaType,
  }: {
    id: Parameters<typeof getMovie | typeof getTvShow>[0];
    mediaType: "movie" | "tv";
  }) => {
    if (mediaType === "movie") {
      const featured = await getMovie(id);
      return { ...featured, media_type: mediaType };
    }
    const featured = await getTvShow(id);
    return { ...featured, media_type: mediaType };
  },
  "featured-media"
);

export const route = {
  load: async () => {
    return {
      trendingMovies: await getTrendingMovies(),
      trendingTv: await getTrendingTv(),
    };
  },
};

export default function Home() {
  const data = createAsync(async () => {
    try {
      const trendingMovies = await getTrendingMovies();
      const trendingTv = await getTrendingTv();

      const items = [...trendingMovies.results, ...trendingTv.results];
      const randomItem = items[Math.floor(Math.random() * items.length)];

      const featured = await getFeaturedMedia({
        id: randomItem.id,
        mediaType: randomItem.media_type,
      });

      return {
        trendingMovies,
        trendingTv,
        featured,
      };
    } catch {
      throw new Error("Data not available");
    }
  });
  return (
    <main class="main">
      <p>{data()?.featured.media_type}</p>
    </main>
  );
}
