import { cache } from "@solidjs/router";
import { getMovie, getTrending, getTvShow } from "~/services/tmdbAPI";

export const getTrendingMovies = cache(async () => {
  "use server";
  return await getTrending("movie");
}, "trending-movies");

export const getTrendingTvSeries = cache(async () => {
  "use server";
  return await getTrending("tv");
}, "trending-tv");

export const getFeaturedMedia = cache(
  async ({
    id,
    mediaType,
  }: {
    id: Parameters<typeof getMovie | typeof getTvShow>[0];
    mediaType: "movie" | "tv";
  }) => {
    "use server";
    if (mediaType === "movie") {
      const featured = await getMovie(id);
      return { ...featured, media_type: mediaType };
    }
    const featured = await getTvShow(id);
    return { ...featured, media_type: mediaType };
  },
  "featured-media"
);

export type FeaturedMedia = Awaited<ReturnType<typeof getFeaturedMedia>>;
export type TrendingMovies = Awaited<ReturnType<typeof getTrendingMovies>>;
export type TrendingTvSeries = Awaited<ReturnType<typeof getTrendingTvSeries>>;
