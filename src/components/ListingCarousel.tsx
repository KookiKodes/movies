import { For, Show } from "solid-js";
import { A } from "@solidjs/router";
import { Card } from "./Card";
import Slider from "./Slider";
import styles from "./ListingCarousel.module.css";

export function ListingCarousel(props) {
  return (
    <Show when={!!props.items?.length}>
      <div class={styles.listing}>
        <Show when={props.title || props.viewAllUrl}>
          <div class={styles.listing__head}>
            <Show when={props.title}>
              <h2 class={styles.listing__title}>{props.title}</h2>
            </Show>

            <Show when={props.viewAllUrl}>
              <A href={props.viewAllHref} class={styles.listing__explore}>
                <strong>Explore All</strong>
              </A>
            </Show>
          </div>
        </Show>
        <div class="carousel">
          <button
            class="carousel__nav carousel__nav--left"
            aria-label="Previous"
            type="button"
            // disabled="disableLeftButton"
            // click="moveToClickEvent('left')"
          >
            {/* <ChevronLeftIcon /> */}
          </button>

          <Slider
            style={{ overflow: "visible" }}
            plugins={[]}
            options={{
              loop: false,
              mode: "free-snap",
              slides: {
                perView: 5,
                spacing: 16,
              },
            }}
            class="carousel__items"
          >
            <For each={props.items}>
              {(item) => (
                <Slider.Slide as="div">
                  <Card item={item} />
                </Slider.Slide>
              )}
            </For>

            <Slider.Slide class="card">
              <A href={props.viewAllHref} class="card__link">
                <div class="card__img">
                  <span>Explore All</span>
                </div>
              </A>
            </Slider.Slide>
          </Slider>

          <button
            class="carousel__nav carousel__nav--right"
            aria-label="Next"
            type="button"
            // disabled="disableRightButton"
            // click="moveToClickEvent('right')"
          >
            {/* <ChevronRightIcon /> */}
          </button>
        </div>
      </div>
    </Show>
  );
}
