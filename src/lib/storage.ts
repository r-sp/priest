export function setSessionStorage(key: string, value: string) {
  if (typeof window !== undefined) {
    try {
      window.sessionStorage.setItem(key, value);
    } catch (e) {
      console.error(e);
    }
  }
}

export function getSessionStorage(key: string) {
  let session;
  if (typeof window !== undefined) {
    try {
      session = window.sessionStorage.getItem(key);
    } catch (e) {
      console.error(e);
    }
  }
  return session;
}

export function removeSessionStorage(key: string) {
  let session;
  if (typeof window !== undefined) {
    try {
      session = window.sessionStorage.removeItem(key);
    } catch (e) {
      console.error(e);
    }
  }
  return session;
}

export function clearSessionStorage() {
  if (typeof window !== undefined) {
    try {
      window.sessionStorage.clear();
    } catch (e) {
      console.error(e);
    }
  }
}

export function setLocalStorage(key: string, value: string) {
  if (typeof window !== undefined) {
    try {
      window.localStorage.setItem(key, value);
    } catch (e) {
      console.error(e);
    }
  }
}

export function getLocalStorage(key: string) {
  let local;
  if (typeof window !== undefined) {
    try {
      local = window.localStorage.getItem(key);
    } catch (e) {
      console.error(e);
    }
  }
  return local;
}

export function removeLocalStorage(key: string) {
  let local;
  if (typeof window !== undefined) {
    try {
      local = window.localStorage.removeItem(key);
    } catch (e) {
      console.error(e);
    }
  }
  return local;
}

export function clearLocalStorage() {
  if (typeof window !== undefined) {
    try {
      window.localStorage.clear();
    } catch (e) {
      console.error(e);
    }
  }
}
