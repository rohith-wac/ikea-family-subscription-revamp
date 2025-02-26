import { useSwrData, useSwrStatic } from "../../helpers/swr";
import { useTranslation } from "react-i18next";
import { useGlobalContext } from "../../context";
import { getFromLocalStorage } from "../../helpers/functions";

const useSummary = () => {
  const { getTextById } = useGlobalContext();
  const { t } = useTranslation(["common"]);

  let order_id = getFromLocalStorage("order_id");
  const { data: userData } = useSwrStatic(`/order/${order_id}`);
  const { data: orderstatus } = useSwrData(`/update-order-status`, {
    status: "success",
    order_id,
  });

  return { t, userData, orderstatus, getTextById };
};

export default useSummary;
