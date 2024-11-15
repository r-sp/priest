"use client";

import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { useColor } from "~/lib/color";
import type { Dispatch, SetStateAction, ChangeEvent } from "react";
import type { CustomColor } from "~/lib/types";

export default function ColorOptions(props: { raw: string; action: Dispatch<SetStateAction<CustomColor>> }) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [focusInput, setFocusInput] = useState<boolean>(true);
  const colorRef = useRef(props.raw);

  const currentColor = props.raw;
  const getColor = useColor;

  const inputColor = (e: ChangeEvent<HTMLInputElement>) => {
    const newColor = getColor(e.target.value);
    const validColor = newColor.isValid();

    if (validColor === true) {
      colorRef.current = e.target.value;
      // console.log("the color is valid, should be change");
      props.action(newColor.toRgb());
    } else {
      // console.log("the color is not valid, should not be change");
    }

    if (focusInput === false) setFocusInput(true);
  };

  const ModalContent = () => {
    return (
      <div className="color-options">
        <label htmlFor="color-input">Edit Color</label>
        <input
          id="color-input"
          type="text"
          autoFocus={focusInput}
          autoCorrect="false"
          autoComplete="false"
          defaultValue={colorRef.current}
          onChange={inputColor}
          onBlur={() => setFocusInput(false)}
        />
      </div>
    );
  };
  const handleModalContent = () => {
    setShowModal(!showModal);

    if (showModal === false) {
      colorRef.current = currentColor;
      setFocusInput(true);
    } else {
      setFocusInput(false);
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
    </>
  );
}
