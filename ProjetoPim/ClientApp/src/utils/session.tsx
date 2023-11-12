export const sessionGet = (key: any) => {
    const stringValue = window.sessionStorage.getItem(key);
    if (stringValue !== null) {
      const value = JSON.parse(stringValue);
      const expirationDate = new Date(value.expirationDate);
      if (expirationDate.getTime() > new Date().getTime()) {
        return value.value;
      }
      window.sessionStorage.removeItem(key);
    }
    return null;
  };
  
  export const sessionSet = (key: any, value: any, expiration = 0) => {
    const expirationDate = new Date(new Date().getTime() + (60000 * expiration));
    const newValue = {
      value,
      expirationDate: expirationDate.toISOString(),
    };
    window.sessionStorage.setItem(key, JSON.stringify(newValue));
  };
  
  export const sessionRemove = (key: any) => {
    window.sessionStorage.removeItem(key);
  };
  
  export const localGet = (key: any) => {
    const stringValue = window.localStorage.getItem(key);
    if (stringValue !== null) {
      const value = JSON.parse(stringValue);
      const expirationDate = new Date(value.expirationDate);
      if (expirationDate > new Date()) {
        return value.value;
      }
      window.localStorage.removeItem(key);
    }
    return null;
  };
  
  export const localSet = (key: any, value: any, expiration = 0) => {
    const expirationDate = new Date(new Date().getTime() + (60000 * expiration));
    const newValue = {
      value,
      expirationDate: expirationDate,
    };
    window.localStorage.setItem(key, JSON.stringify(newValue));
  };
  
  export const localRemove = (key: any) => {
    window.localStorage.removeItem(key);
  };