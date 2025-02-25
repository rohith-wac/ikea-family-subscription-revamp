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
