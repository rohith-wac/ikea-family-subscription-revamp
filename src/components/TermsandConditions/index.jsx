import useTermsAndConditions from "./useTermsAndConditions";

const TermsandConditions = ({ getTextById, Style }) => {
  const { direction, termsAndCondition } = useTermsAndConditions();
  return (
    <div dir={direction} className={Style.termsandcondition}>
      <h2 className="h2">{getTextById(21)}</h2>
      <p>{getTextById(60)}</p>
      <ol>
        {termsAndCondition?.map((id) => (
          <li key={id}>
            <p>{getTextById(id)}</p>
          </li>
        ))}
      </ol>
      <h3 className="h3">{getTextById(55)}</h3>
      <p>{getTextById(56)}</p>
      <ul>
        <li>{getTextById(57)}</li>
        <li>{getTextById(58)}</li>
      </ul>
      <p>{getTextById(59)}</p>
    </div>
  );
};

export default TermsandConditions;
