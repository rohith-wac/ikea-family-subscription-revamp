import { useSwrStatic } from "../../helpers/swr";
import Style from "./SubscriptionText.module.scss";
import { useTranslation } from "react-i18next";
import { useRtl } from "../../hooks/useRtl";

const useSubscriptionText = () => {
  const { rtl } = useRtl({Style});
  const { t } = useTranslation(["common"]);

  // Base api to get the family subscription amount
  const { data: basicData } = useSwrStatic(`/basic-details`);

  return { rtl, amount: basicData?.data?.amount, t };
};

export default useSubscriptionText;
