export default function FirstRow({props}) {
  const {handleClickOnAllClear, handleClickOnOperator} = props;
  return (
    <div id="first-row" className="row">
      <div id="AC" onClick={handleClickOnAllClear}>
        AC
      </div>
      <div onClick={handleClickOnOperator}>/</div>
      <div id="multiplication-sign" onClick={handleClickOnOperator}>
        x
      </div>
    </div>
  );
}
