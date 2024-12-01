"use client";

import type { ReactNode, ComponentPropsWithoutRef, KeyboardEvent } from "react";
import { createContext, useRef, useContext, useCallback } from "react";
import { createStore, useStore } from "zustand";
import clsx from "clsx";

type TabProps = {
  section: string;
};
type TabActions = {
  setSection: (tab: string) => void;
};
type TabState = TabProps & TabActions;

const createTabStore = (initValue: TabProps) => {
  return createStore<TabState>()((set) => ({
    ...initValue,
    setSection: (tab) => set(() => ({ section: tab })),
  }));
};

type TabApi = ReturnType<typeof createTabStore>;

const TabContext = createContext<TabApi | undefined>(undefined);

function TabProvider({ children, initValue }: { children: ReactNode; initValue: TabProps }) {
  const storeRef = useRef<TabApi>();

  if (!storeRef.current) {
    storeRef.current = createTabStore(initValue);
  }

  return <TabContext.Provider value={storeRef.current}>{children}</TabContext.Provider>;
}

function useTabStore<T>(selector: (store: TabState) => T) {
  const tabContext = useContext(TabContext);

  if (!tabContext) {
    throw new Error("useTabStore must be used within TabProvider");
  }

  return useStore(tabContext, selector);
}

export function Tabs({
  children,
  label,
  initValue,
  ...rest
}: { children: ReactNode; label: string; initValue: TabProps } & ComponentPropsWithoutRef<"section">) {
  const store = initValue;

  return (
    <TabProvider initValue={store}>
      <section aria-label={label} className="grid gap-4" {...rest}>
        {children}
      </section>
    </TabProvider>
  );
}

export function TabList({
  children,
  label,
  ...rest
}: { children: ReactNode; label: string } & ComponentPropsWithoutRef<"nav">) {
  const refList = useRef<HTMLElement>(null);

  const handleKeyboard = useCallback((e: KeyboardEvent) => {
    const list = refList.current;
    if (!list) return;

    const tabs = Array.from<HTMLElement>(list.querySelectorAll("button:not([disabled])"));

    const index = tabs.indexOf(document.activeElement as HTMLElement);
    if (index < 0) return;

    switch (e.key) {
      case "ArrowLeft": {
        const next = (index - 1 + tabs.length) % tabs.length;
        tabs[next]?.focus();
        break;
      }
      case "ArrowRight": {
        const next = (index + 1 + tabs.length) % tabs.length;
        tabs[next]?.focus();
        break;
      }
    }
  }, []);

  return (
    <nav ref={refList} role="tablist" aria-label={label} {...rest} className="flex flex-wrap gap-2" onKeyDown={handleKeyboard}>
      {children}
    </nav>
  );
}

export function Tab({
  children,
  select,
  callback,
  ...rest
}: { children: ReactNode; select: string; callback?: () => void } & ComponentPropsWithoutRef<"button">) {
  const { section, setSection } = useTabStore((state) => state);

  return (
    <button
      role="tab"
      aria-selected={section === select ? true : false}
      aria-controls={`tabpanel-${select}`}
      className={clsx(
        section === select
          ? "bg-holy-800 text-holy-200"
          : "border-holy-700 text-holy-400 hover:bg-holy-800 focus:bg-holy-800 active:border-holy-600 active:bg-holy-700",
        "rounded-md px-2 py-1 text-sm font-normal",
      )}
      tabIndex={section === select ? 0 : -1}
      onClick={() => {
        setSection(select);
        if (callback) callback();
      }}
      {...rest}
    >
      <span>{children}</span>
    </button>
  );
}

export function TabPanel({ children }: { children: ReactNode }) {
  const { section } = useTabStore((state) => state);

  return (
    <div role="tabpanel" aria-label={`tabpanel-${section}`}>
      {children}
    </div>
  );
}
