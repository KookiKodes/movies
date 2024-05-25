import { Title } from "@solidjs/meta";
import { createResource } from "solid-js";
import { getMovie, getTrending, getTvShow } from "~/services/tmdbAPI";

export default function Home() {
  const data = createResource(async () => {
    try {
      const trendingMovies = await getTrending("movie");
      const trendingTv = await getTrending("tv");

      let featured;

      const items = [...trendingMovies.results, ...trendingTv.results];
      const randomItem = items[Math.floor(Math.random() * items.length)];

      if (randomItem.media_type === "movie") {
        featured = await getMovie(randomItem.id);
      } else {
        featured = await getTvShow(randomItem.id);
      }

      return {
        trendingMovies,
        trendingTv,
        featured,
      };
    } catch {
      throw new Error("Data not available");
    }
  });
  return <main class="main"></main>;
}
