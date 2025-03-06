import { useParams } from "react-router-dom";
import { DIRECTION } from "../../constants";

const useTermsAndConditions = () => {
  const initialIds = Array.from({ length: 12 }, (_, index) => index + 22);
  const remainingIds = Array.from({ length: 4 }, (_, index) => index + 51);
  const { lang } = useParams();
  const direction = DIRECTION?.[lang];
  return { termsAndCondition: [...initialIds, ...remainingIds], direction };
};

export default useTermsAndConditions;
