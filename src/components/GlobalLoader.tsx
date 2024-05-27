import { Show } from "solid-js";
import { useIsRouting } from "@solidjs/router";

import "./GlobalLoader.css";

export default function GlobalLoader() {
  const isRouting = useIsRouting();
  return (
    <Show when={isRouting()}>
      <div class="global-loader global-loader--loading">
        <div class="global-loader__fill" />
      </div>
    </Show>
  );
}
