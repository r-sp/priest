"use client";

import { createPortal } from "react-dom";
import type { ReactNode, Dispatch, SetStateAction, ComponentPropsWithoutRef } from "react";

interface PortalProps {
  children: ReactNode;
  state: { get: boolean; set: Dispatch<SetStateAction<boolean>> };
  btn: { icon?: ReactNode; label?: { open: string; close: string } };
  dom?: { container?: Element | DocumentFragment; overlay?: number };
}

export default function Portal({ children, state, btn, dom, ...rest }: PortalProps & ComponentPropsWithoutRef<"button">) {
  const BtnContent = () => {
    if (btn.icon && btn.label) {
      return (
        <>
          {btn.icon}
          <span>{state.get ? btn.label.close : btn.label.open}</span>
        </>
      );
    } else if (btn.icon) {
      return btn.icon;
    } else if (btn.label) {
      return <span>{state.get ? btn.label.close : btn.label.open}</span>;
    } else {
      return <span>{state.get ? "Close" : "Open"}</span>;
    }
  };

  return (
    <>
      <button onClick={() => state.set(!state.get)} {...rest}>
        <BtnContent />
      </button>

      {state.get && createPortal(children, dom?.container || document.getElementById("portal") || document.body)}

      {state.get &&
        dom?.overlay &&
        createPortal(
          <div
            style={{ position: "fixed", bottom: 0, left: 0, right: 0, top: 0, zIndex: dom.overlay }}
            tabIndex={0}
            onFocus={() => state.set(false)}
          ></div>,
          dom?.container || document.getElementById("portal") || document.body,
        )}
    </>
  );
}
