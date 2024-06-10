import KeenSlider, {
  type KeenSliderInstance,
  type KeenSliderHooks,
  type KeenSliderOptions,
  type KeenSliderPlugin,
} from "keen-slider";
import { createEffect, createSignal, on, onCleanup } from "solid-js";

export default function createSlider<
  T extends HTMLElement,
  O = {},
  P = {},
  H extends string = KeenSliderHooks
>(
  options: () => KeenSliderOptions<O, P, H> | undefined = () => undefined,
  plugins: () => KeenSliderPlugin<O, P, H>[] | undefined = () => undefined
) {
  const [sliderRef, setSliderRef] = createSignal<KeenSliderInstance<
    O,
    P,
    H
  > | null>(null);

  let ref: T | null = null;

  const onRefChange = (node: T | null) => {
    ref = node;
    if (node) {
      setSliderRef(() => {
        return new KeenSlider<O, P, H>(node, options(), plugins());
      });
    } else {
      if (sliderRef() && sliderRef()?.destroy) sliderRef()!.destroy();
      setSliderRef(null);
    }
  };

  createEffect(
    on(options, (options) => {
      const slider = sliderRef();
      if (!slider) return;
      slider.update(options);
    })
  );

  onCleanup(() => {
    if (sliderRef() && sliderRef()?.destroy) sliderRef()!.destroy();
    setSliderRef(null);
  });

  return [onRefChange, sliderRef] as const;
}
