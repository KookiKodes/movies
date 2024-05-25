import { createAsync } from "@solidjs/router";
import {
  getFeaturedMedia,
  getTrendingMovies,
  getTrendingTvSeries,
} from "~/services/app";

export const route = {
  load: async () => {
    return {
      trendingMovies: await getTrendingMovies(),
      trendingTvSeries: await getTrendingTvSeries(),
    };
  },
};

export default function Home() {
  const data = createAsync(async () => {
    try {
      const trendingMovies = await getTrendingMovies();
      const trendingTv = await getTrendingTvSeries();

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
