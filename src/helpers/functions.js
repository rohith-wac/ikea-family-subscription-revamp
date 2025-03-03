export const pushToAdobeDataLayer = (values) => {
  window.adobeDataLayer.push({
    event: "deliverysubscription",
    userInfo: {
      phone: values?.mobile,
    },
    identityMap: {
      ECID: [
        {
          id: "adobeECID",
          authenticatedState: "ambiguous",
          primary: false,
        },
      ],
      PHONE: [
        {
          id: values?.mobile,
          authenticatedState: "authenticated",
          primary: true,
        },
      ],
    },
  });
};

// Utility to get data from localStorage
export const getFromLocalStorage = (key) => {
  if (typeof window === "undefined") return null;

  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error(
      `Error parsing JSON from localStorage for key: ${key}`,
      error
    );
    return null;
  }
};

// Utility to set data in localStorage
export const setInLocalStorage = (key, value) => {
  if (typeof window === "undefined") return;

  try {
    const stringifiedValue = JSON.stringify(value);
    localStorage.setItem(key, stringifiedValue);
  } catch (error) {
    console.error(`Error setting data in localStorage for key: ${key}`, error);
  }
};

// Utility to remove data from localStorage
export const removeFromLocalStorage = (key) => {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(
      `Error removing data from localStorage for key: ${key}`,
      error
    );
  }
};
