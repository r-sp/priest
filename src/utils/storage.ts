import { isClient } from "./prefix";

export const setSessionStorage = (key: string, value: string): void => {
  if (isClient) {
    try {
      window.sessionStorage.setItem(key, value);
    } catch (e) {
      console.error(e);
    }
  }
};

export const setLocalStorage = (key: string, value: string): void => {
  if (isClient) {
    try {
      window.localStorage.setItem(key, value);
    } catch (e) {
      console.error(e);
    }
  }
};

export const getSessionStorage = (key: string): string | null | undefined => {
  let session;
  if (isClient) {
    try {
      session = window.sessionStorage.getItem(key);
    } catch (e) {
      console.error(e);
    }
  }
  return session;
};

export const getLocalStorage = (key: string): string | null | undefined => {
  let local;
  if (isClient) {
    try {
      local = window.localStorage.getItem(key);
    } catch (e) {
      console.error(e);
    }
  }
  return local;
};

export const removeSessionStorage = (key: string): void => {
  let session;
  if (isClient) {
    try {
      session = window.sessionStorage.removeItem(key);
    } catch (e) {
      console.error(e);
    }
  }
  return session;
};

export const removeLocalStorage = (key: string): void => {
  let local;
  if (isClient) {
    try {
      local = window.localStorage.removeItem(key);
    } catch (e) {
      console.error(e);
    }
  }
  return local;
};

export const clearSessionStorage = (): void => {
  if (isClient) {
    try {
      window.sessionStorage.clear();
    } catch (e) {
      console.error(e);
    }
  }
};

export const clearLocalStorage = (): void => {
  if (isClient) {
    try {
      window.localStorage.clear();
    } catch (e) {
      console.error(e);
    }
  }
};
