export default function ThirdRow({props}) {
  const {handleClickOnNumber, handleClickOnOperator} = props;
  return (
    <div id="third-row" className="row">
      <div onClick={handleClickOnNumber}>4</div>
      <div onClick={handleClickOnNumber}>5</div>
      <div onClick={handleClickOnNumber}>6</div>
      <div id="plus-sign" onClick={handleClickOnOperator}>
        +
      </div>
    </div>
  );
}
