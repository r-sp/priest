"use client";

import { useState, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import { useColor } from "~/lib/color";
import type { Dispatch, SetStateAction, ChangeEvent, MutableRefObject } from "react";
import type { AnyColor, HslaColor } from "~/lib/types";

export default function ColorOptions(props: {
  color: { hex: string; rgb: string; raw: HslaColor };
  action: Dispatch<SetStateAction<AnyColor>>;
}) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [focusInput, setFocusInput] = useState<boolean>(false);
  const [focusHue, setFocusHue] = useState<boolean>(false);
  const [focusSaturation, setFocusSaturation] = useState<boolean>(false);
  const [focusLightness, setFocusLightness] = useState<boolean>(false);

  const currentHexColor = props.color.hex;
  const currentHslColor = props.color.raw;
  const colorPreview = props.color.rgb;
  const colorHex = useRef(currentHexColor);
  const getColor = useColor;

  const colorHue = useRef(currentHslColor.h);
  const colorSaturation = useRef(currentHslColor.s);
  const colorLightness = useRef(currentHslColor.l);
  const colorAlpha = useRef(currentHslColor.a);

  const updateInputColor = (e: ChangeEvent<HTMLInputElement>) => {
    const newColor = getColor(e.target.value);
    const validColor = newColor.isValid();

    if (validColor === true) {
      colorHex.current = e.target.value;
      // console.log("the color is valid, should be change");
      props.action(newColor.toRgb());
    } else {
      // console.log("the color is not valid, should not be change");
    }
  };

  const updateHslColor = (color: { h?: number; s?: number; l?: number; a?: number }) => {
    const partial = Object.getOwnPropertyNames(color)[0];

    const update = (req: MutableRefObject<number>, range: number, space: "h" | "s" | "l") => {
      const currentColor = {
        h: colorHue.current,
        s: colorSaturation.current,
        l: colorLightness.current,
        a: colorAlpha.current,
      };

      let newColor: HslaColor;
      if (space === "h") {
        newColor = { ...currentColor, h: range };
      } else if (space === "s") {
        newColor = { ...currentColor, s: range };
      } else if (space === "l") {
        newColor = { ...currentColor, l: range };
      } else {
        newColor = currentColor;
      }

      req.current = range;
      props.action(newColor);
      colorHex.current = getColor(newColor).toHex();
      return newColor;
    };

    if (partial !== undefined) {
      if (partial === "h") {
        update(colorHue, color.h!, partial);
      } else if (partial === "s") {
        update(colorSaturation, color.s!, partial);
      } else if (partial === "l") {
        update(colorLightness, color.l!, partial);
      }
    }
  };

  const modalRef = useRef<HTMLElement>(null);

  const ModalContent = () => {
    const colorInput = useMemo(() => {
      if (colorHex.current !== currentHexColor && focusInput === false) {
        colorHex.current = currentHexColor;
      }
      if (colorHue.current !== currentHslColor.h && focusHue === false) {
        colorHue.current = currentHslColor.h;
      }
      if (colorSaturation.current !== currentHslColor.s && focusSaturation === false) {
        colorSaturation.current = currentHslColor.s;
      }
      if (colorLightness.current !== currentHslColor.l && focusLightness === false) {
        colorLightness.current = currentHslColor.l;
      }
      // if (colorAlpha.current !== currentHslColor.a && focusAlpha === false) {
      //   colorAlpha.current = currentHslColor.a;
      // }

      return {
        hex: colorHex.current,
        hsl: { h: colorHue.current, s: colorSaturation.current, l: colorLightness.current, a: colorAlpha.current },
        rgb: colorPreview,
      };
    }, []);

    return (
      <aside className="color-options" tabIndex={0} ref={modalRef}>
        <div style={{ backgroundColor: colorInput.rgb, height: "3rem", width: "3rem" }}></div>
        <div>
          <label htmlFor="color-input">Edit Color</label>
          <input
            id="color-input"
            type="text"
            autoCorrect="false"
            autoComplete="false"
            autoFocus={focusInput}
            defaultValue={colorInput.hex}
            onChange={(e) => {
              updateInputColor(e);
              setFocusInput(true);
            }}
            onBlur={() => setFocusInput(false)}
          />
        </div>
        <div>
          <label htmlFor="color-input-hue">Hue</label>
          <input
            id="color-input-hue"
            type="number"
            autoFocus={focusHue}
            defaultValue={colorInput.hsl.h}
            min={0}
            max={360}
            onChange={(e) => {
              updateHslColor({ h: e.target.valueAsNumber });
              setFocusHue(true);
            }}
            onBlur={() => setFocusHue(false)}
          />
        </div>
        <div>
          <label htmlFor="color-input-saturation">Saturation</label>
          <input
            id="color-input-saturation"
            type="number"
            autoFocus={focusSaturation}
            defaultValue={colorInput.hsl.s}
            min={0}
            max={100}
            onChange={(e) => {
              updateHslColor({ s: e.target.valueAsNumber });
              setFocusSaturation(true);
            }}
            onBlur={() => setFocusSaturation(false)}
          />
        </div>
        <div>
          <label htmlFor="color-input-lightness">Lightness</label>
          <input
            id="color-input-lightness"
            type="number"
            autoFocus={focusLightness}
            defaultValue={colorInput.hsl.l}
            min={0}
            max={100}
            onChange={(e) => {
              updateHslColor({ l: e.target.valueAsNumber });
              setFocusLightness(true);
            }}
            onBlur={() => setFocusLightness(false)}
          />
        </div>
        <div>
          <span>Alpha: {colorInput.hsl.a}</span>
        </div>
      </aside>
    );
  };

  const handleModalContent = () => {
    setShowModal(!showModal);

    if (showModal && typeof window !== "undefined") {
      const editButton = document.querySelector<HTMLButtonElement>(".color-edit");
      editButton?.focus();
    }
  };

  return (
    <>
      <button className="color-edit btn" aria-label="edit color" onClick={handleModalContent}>
        <svg role="img" height="24" width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="currentColor"
            d="M5.30775 20.5C4.80258 20.5 4.375 20.325 4.025 19.975C3.675 19.625 3.5 19.1974 3.5 18.6923V5.30775C3.5 4.80258 3.675 4.375 4.025 4.025C4.375 3.675 4.80258 3.5 5.30775 3.5H13.9635L12.4635 5H5.30775C5.23075 5 5.16025 5.03208 5.09625 5.09625C5.03208 5.16025 5 5.23075 5 5.30775V18.6923C5 18.7693 5.03208 18.8397 5.09625 18.9037C5.16025 18.9679 5.23075 19 5.30775 19H18.6923C18.7693 19 18.8398 18.9679 18.9038 18.9037C18.9679 18.8397 19 18.7693 19 18.6923V11.473L20.5 9.973V18.6923C20.5 19.1974 20.325 19.625 19.975 19.975C19.625 20.325 19.1974 20.5 18.6923 20.5H5.30775ZM9.5 14.5V11.0673L18.5598 2.00775C18.7148 1.85258 18.8852 1.73942 19.0712 1.66825C19.2571 1.59708 19.4462 1.5615 19.6385 1.5615C19.8347 1.5615 20.0231 1.59708 20.2038 1.66825C20.3846 1.73942 20.5493 1.84933 20.698 1.998L21.9538 3.25C22.0986 3.40517 22.2098 3.57633 22.2875 3.7635C22.365 3.95067 22.4038 4.14042 22.4038 4.33275C22.4038 4.52508 22.3708 4.71158 22.3048 4.89225C22.2388 5.07308 22.1282 5.241 21.973 5.396L12.8845 14.5H9.5ZM11 13H12.2462L18.4788 6.76725L17.8557 6.14425L17.1885 5.502L11 11.6905V13Z"
          />
        </svg>
        <span>Edit</span>
      </button>
      {showModal && createPortal(<ModalContent />, document.body)}
      {showModal &&
        createPortal(
          <div
            className="color-overlay options"
            aria-hidden="true"
            tabIndex={0}
            onClick={handleModalContent}
            onFocus={handleModalContent}
          />,
          document.body,
        )}
    </>
  );
}
