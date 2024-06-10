import { createAsync } from "@solidjs/router";
import { Show } from "solid-js";
import Hero from "~/components/Hero";
import { ListingCarousel } from "~/components/ListingCarousel";
import {
  getFeaturedMedia,
  getTrendingMovies,
  getTrendingTvSeries,
} from "~/services/api";
import { getListItem } from "~/services/tmdbAPI";

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
        <ListingCarousel
          items={data()?.trendingMovies.results}
          viewAllHref={`/movie/categories/trending`}
          title={getListItem("movie", "trending")?.TITLE}
        />
      </Show>
    </main>
  );
}
