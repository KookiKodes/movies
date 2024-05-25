import { createEffect, createSignal, on, Show } from "solid-js";
import { useIsRouting, useBeforeLeave } from "@solidjs/router";

import "./GlobalLoader.css";

export default function GlobalLoader() {
  const [inView, setInView] = createSignal(false);
  const isRouting = useIsRouting();

  useBeforeLeave(() => {
    setInView(true);
  });

  createEffect(
    on(isRouting, (isRouting) => {
      setInView(isRouting);
    })
  );

  return (
    <Show when={inView()}>
      <div class="global-loader global-loader--loading">
        <div class="global-loader__fill" />
      </div>
    </Show>
  );
}
