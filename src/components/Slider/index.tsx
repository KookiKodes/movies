import { clientOnly } from "@solidjs/start";
import createSlider from "./createSlider";
import { Slide } from "./Slider";

const Slider = clientOnly(() => import("./Slider"));

export default Object.assign(Slider, {
  Slide,
});

export { createSlider };
