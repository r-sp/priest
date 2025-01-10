"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import Navigation from "./navigation";
import InputCss from "./color/css";
import InputMode from "./mode";

export default function Textbox() {
  const [modal, setModal] = useState<boolean>(false);
  const [focus, setFocus] = useState<boolean>(false);
  const [hex, setHex] = useState<boolean>(false);

  return (
    <Navigation modal={modal} action={[setModal, setFocus]}>
      <InputCss
        hex={hex}
        modal={modal}
        focus={focus}
        action={[setHex, setFocus, setModal]}
      />
      <InputMode hex={hex} modal={modal} action={[setHex, setModal]} />
      {modal
        ? createPortal(
            <span
              role="button"
              aria-label="close color conversion"
              className="overlay fixed z-12"
              tabIndex={0}
              onFocus={() => {
                setFocus(false);
                setModal(false);
              }}
            ></span>,
            document.body,
          )
        : null}
    </Navigation>
  );
}
