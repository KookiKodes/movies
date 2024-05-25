import { Show } from "solid-js";

import "./GlobalLoader.css";
import { useIsRouting } from "@solidjs/router";

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
