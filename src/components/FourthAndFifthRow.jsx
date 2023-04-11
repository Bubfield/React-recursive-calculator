export default function FourthAndFifthRow({props}) {
  const {handleClickOnEqualSign, handleClickOnNumber, handleClickOnDecimal} =
    props;

  return (
    <div id="fourth-and-fifth-row">
      <div onClick={handleClickOnNumber}>1</div>
      <div onClick={handleClickOnNumber}>2</div>
      <div onClick={handleClickOnNumber}>3</div>
      <div id="equal-sign" onClick={handleClickOnEqualSign}>
        =
      </div>
      <div id="zero" onClick={handleClickOnNumber}>
        0
      </div>
      <div id="dot-symbol" onClick={handleClickOnDecimal}>
        .
      </div>
    </div>
  );
}
