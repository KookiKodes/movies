import { A } from "@solidjs/router";
import Poster from "./Poster";

import styles from "./Card.module.css";

export type CardProps = {
  loading: "lazy" | "eager";
  item: {
    id: string | number;
    media_type: string;
    name?: string;
    title?: string;
    poster_path: string;
  };
};

export function Card(props: CardProps) {
  const media = () =>
    props.item.media_type
      ? props.item.media_type
      : props.item.name
      ? "tv"
      : "movie";
  return (
    <div class={styles.card}>
      <A class={styles.card__link} href={`/${media()}/${props.item.id}`}>
        <div class={styles.card__img}>
          <Poster
            path={props.item.poster_path}
            alt={props.item.title || props.item.name}
            loading={props.loading || "eager"}
          />
        </div>
        <h2>{props.item.title}</h2>
      </A>
    </div>
  );
}
