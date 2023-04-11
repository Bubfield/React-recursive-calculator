export default function SecondRow({props}) {
  const {handleClickOnNumber, handleClickOnOperator} = props;

  return (
    <div id="second-row" className="row">
      <div onClick={handleClickOnNumber}>7</div>
      <div onClick={handleClickOnNumber}>8</div>
      <div onClick={handleClickOnNumber}>9</div>
      <div id="minus-sign" onClick={handleClickOnOperator}>
        -
      </div>
    </div>
  );
}
