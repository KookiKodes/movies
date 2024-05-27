import { createAsync } from "@solidjs/router";
import { Show } from "solid-js";
import Hero from "~/components/Hero";
import {
  getFeaturedMedia,
  getTrendingMovies,
  getTrendingTvSeries,
} from "~/services/api";

export const route = {
  load: async () => {
    getTrendingMovies();
    getTrendingTvSeries();
  },
};

const getRouteData = async () => {
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
};
export default function Home() {
  const data = createAsync(() => getRouteData());
  return (
    <main class="main">
      <Show when={data()}>
        <Hero item={data()!.featured} />
      </Show>
    </main>
  );
}
