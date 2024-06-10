import type {
  KeenSliderHooks,
  KeenSliderOptions,
  KeenSliderPlugin,
} from "keen-slider";
import { type JSX, splitProps, type ValidComponent } from "solid-js";
import { Dynamic } from "solid-js/web";
import createSlider from "./createSlider";

import "./Slider.css";

type SliderProps<
  Tag extends keyof JSX.HTMLElementTags = "div",
  O = {},
  P = {},
  H extends string = KeenSliderHooks
> = JSX.HTMLElementTags[Tag] & {
  as?: Tag;
  options?: KeenSliderOptions<O, P, H>;
  plugins?: KeenSliderPlugin<O, P, H>[];
};

type SlideProps<Tag extends keyof JSX.HTMLElementTags = "div"> =
  JSX.HTMLElementTags[Tag] & {
    as?: Tag;
  };

export function Slide<Tag extends keyof JSX.HTMLElementTags = "div">(
  props: SlideProps<Tag>
) {
  const [_, elementProps] = splitProps(props, ["class", "as"]);
  return (
    <Dynamic
      component={props.as || ("div" as ValidComponent)}
      classList={{
        [props.class || ""]: !!props.class,
        "keen-slider__slide": true,
      }}
      {...elementProps}
    >
      {props.children}
    </Dynamic>
  );
}

export default function Slider<
  Tag extends keyof JSX.HTMLElementTags = "div",
  O = {},
  P = {},
  H extends string = KeenSliderHooks
>(props: SliderProps<Tag, O, P, H>) {
  const [__, elementProps] = splitProps(props, [
    "options",
    "plugins",
    "as",
    "class",
  ]);

  const [ref, _] = createSlider<HTMLElementTagNameMap[Tag], O, P, H>(
    () => props.options,
    () => props.plugins
  );

  return (
    <Dynamic
      component={props.as || ("div" as ValidComponent)}
      ref={ref}
      classList={{
        [props.class || ""]: !!props.class,
        "keen-slider": true,
      }}
      {...elementProps}
    >
      {props.children}
    </Dynamic>
  );
}

// function initializeSliderClasses(ComponentType = (props, options) => {}) {
//   return (props, options) => {
//     const { element } = options;
//     element.classList.add("keen-slider");
//     Array.from(element.children).forEach((child) =>
//       child.classList.add("keen-slider__slide")
//     );
//     return ComponentType(props, options);
//   };
// }

// function constrain(value, min = -Infinity, max = Infinity) {
//   return Math.min(Math.max(value, min), max);
// }

// function attachMoreDetails(prevSlide) {
//   return function (slider) {
//     if (slider.track.details.rel != slider.animator.targetIdx) return;

//     slider.direction =
//       slider.track.details.rel > prevSlide ? "forward" : "backward";

//     prevSlide = slider.track.details.rel;
//   };
// }

// function attachAriaAttributes(slider) {
//   const maxIdx =
//     slider.track.details.maxIdx === Infinity
//       ? slider.track.details.length
//       : slider.track.details.maxIdx;
//   slider.container.setAttribute("role", "listbox");
//   slider.container.setAttribute(
//     "aria-orientation",
//     slider.options.vertical ? "vertical" : "horizontal"
//   );
//   slider.container.setAttribute("aria-multiselectable", "false");
//   slider.container.setAttribute("aria-label", "Slider");
//   slider.container.setAttribute("tabindex", "0");
//   slider.container.setAttribute("aria-live", "polite");
//   slider.container.setAttribute("aria-atomic", "true");
//   slider.container.setAttribute("aria-live", "polite");
//   slider.container.setAttribute("aria-busy", "false");
//   slider.container.setAttribute("aria-valuemin", "0");
//   slider.container.setAttribute("aria-valuemax", maxIdx);
//   slider.container.setAttribute("aria-valuenow", slider.track.details.rel);

//   function getMaxRel(rel, perView = 1) {
//     return Math.min(maxIdx, Math.floor(rel + perView - 1));
//   }

//   function slideIsActive(idx) {
//     const perView = slider.options?.slides?.perView || 1,
//       rel = slider.track.details.rel,
//       maxRel = getMaxRel(rel, perView);

//     return rel <= idx && idx <= maxRel;
//   }

//   let prevRel = slider.track.details.rel,
//     prevMaxRel = getMaxRel(prevRel, slider.options?.slides?.perView || 1);

//   async function updateTabIndexes(slide, tabindex) {
//     const focusableElements = Array.from(
//       slide.querySelectorAll(
//         "input, a, button:not(:disabled), textarea, select, textarea, [tabindex]"
//       )
//     );
//     focusableElements.forEach((element) => {
//       element.setAttribute("tabindex", tabindex);
//     });
//   }

//   function updateAriaActiveSlide(slide) {
//     slide.setAttribute("aria-selected", "true");
//     slide.setAttribute("aria-hidden", "false");
//     slide.setAttribute("tabindex", "0");
//     updateTabIndexes(slide, "0");
//   }

//   function updateAriaInActiveSlide(slide) {
//     slide.setAttribute("aria-selected", "false");
//     slide.setAttribute("aria-hidden", "true");
//     slide.setAttribute("tabindex", "-1");
//     updateTabIndexes(slide, "-1");
//   }

//   function setupInitialAriaSlideAttributes(slider) {
//     slider.slides.forEach((slide, i) => {
//       slide.setAttribute("role", "option");
//       if (slideIsActive(i)) updateAriaActiveSlide(slide);
//       else updateAriaInActiveSlide(slide);
//     });
//   }

//   function updateSlideAriaAttributes(slider) {
//     const slides = Array.from(slider.slides),
//       prevActiveSlides = slides.slice(prevRel, prevMaxRel + 1),
//       activeSlides = slides.slice(
//         slider.track.details.rel,
//         getMaxRel(slider.options?.slides?.perView || 1) + 1
//       );

//     prevActiveSlides.forEach(updateAriaInActiveSlide);
//     activeSlides.forEach(updateAriaActiveSlide);
//     prevRel = slider.track.details.rel;
//     prevMaxRel = getMaxRel(prevRel, slider.options?.slides?.perView || 1);
//   }

//   slider.on("slideChanged", updateSlideAriaAttributes);
//   slider.on("created", setupInitialAriaSlideAttributes);
//   slider.on("optionsChanged", setupInitialAriaSlideAttributes);
//   slider.on("updated", setupInitialAriaSlideAttributes);

//   setupInitialAriaSlideAttributes(slider);
// }

// class CustomKeenSlider extends KeenSlider {
//   constructor(element, config, plugins = []) {
//     super(element, config, plugins);
//     let prevSlide = 0;

//     this.direction = null;
//     this.on("slideChanged", attachMoreDetails(prevSlide));

//     attachAriaAttributes(this);

//     this.next = function () {
//       const amount = this.options?.slides?.perScroll || 1;
//       if (!this.options.loop) {
//         return this.moveToIdx(
//           constrain(
//             this.track.details.rel + amount,
//             0,
//             this.track.details.maxIdx
//           )
//         );
//       }
//       return this.moveToIdx(constrain(this.track.details.abs + amount), true);
//     };

//     this.prev = function () {
//       const amount = this.options?.slides?.perScroll || 1;
//       if (!this.options.loop) {
//         this.moveToIdx(
//           constrain(
//             this.track.details.rel - amount,
//             0,
//             this.track.details.maxIdx
//           )
//         );
//       }
//       return this.moveToIdx(constrain(this.track.details.abs - amount), true);
//     };
//   }
// }
