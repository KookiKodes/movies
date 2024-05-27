import type { FeaturedMedia } from "~/services/api";
import { formatRuntime } from "~/utils/format";
import { Show } from "solid-js";
import styles from "./Hero.module.css";

export default function Hero(props: { item: FeaturedMedia }) {
  const stars = () =>
    props.item.vote_average ? props.item.vote_average * 10 : 0;
  const name = () =>
    props.item.media_type === "tv" ? props.item.name : props.item.title;
  const yearStart = () => {
    const date =
      props.item.media_type === "movie"
        ? props.item.release_date
        : props.item.first_air_date;
    if (date) {
      return date.split("-")[0];
    }
  };

  return (
    <div>
      <div class={styles.hero}>
        <div class={styles.backdrop}>
          <div>
            <Show
              when={props.item.videos.results.some(
                (video) => video.type === "Trailer"
              )}
            >
              <button
                class={styles.play}
                type="button"
                aria-label="Play Trailer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="55"
                  height="55"
                  viewBox="0 0 55 55"
                >
                  <circle
                    cx="27.5"
                    cy="27.5"
                    r="26.75"
                    fill="none"
                    stroke="#fff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  />
                  <path
                    fill="none"
                    stroke="#fff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M20.97 40.81L40.64 27.5 20.97 14.19v26.62z"
                  />
                </svg>
              </button>
            </Show>
            <picture>
              <source
                srcset={`https://image.tmdb.org/t/p/w1280${props.item.backdrop_path}`}
                media="(min-width: 780px)"
              />
              <source
                srcset={`https://image.tmdb.org/t/p/w780${props.item.backdrop_path}`}
                media="(min-width: 300px)"
              />
              <img
                alt={
                  props.item.media_type === "movie"
                    ? props.item.title
                    : props.item.name
                }
                class={styles.image}
                style={{
                  height: "100%",
                }}
                src={`https://image.tmdb.org/t/p/w300${props.item.backdrop_path}`}
              />
            </picture>
          </div>
        </div>

        <div class={styles.pane}>
          <div>
            <h1 class={styles.name}>{name()}</h1>
            <div class={styles.meta}>
              <div class={styles.rating}>
                <Show when={stars()}>
                  <div class={styles.stars}>
                    <div style={{ width: `${stars()}%` }} />
                  </div>
                </Show>

                <Show when={props.item.vote_count > 0}>
                  <div>{props.item.vote_count} Reviews</div>
                </Show>
              </div>

              <div class={styles.info}>
                <Show
                  when={
                    props.item.media_type === "tv" &&
                    props.item.number_of_seasons
                  }
                >
                  <span>
                    Season{" "}
                    {props.item.media_type === "tv" &&
                      props.item.number_of_seasons}
                  </span>
                </Show>
                <Show when={yearStart()}>
                  <span>{yearStart()}</span>
                </Show>
                <Show
                  when={props.item.media_type === "movie" && props.item.runtime}
                >
                  <span>
                    {props.item.media_type === "movie" &&
                      formatRuntime(props.item.runtime)}
                  </span>
                </Show>
              </div>
            </div>
            <div class={styles.desc}>{props.item.overview}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
