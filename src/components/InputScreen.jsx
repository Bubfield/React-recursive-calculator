export default function InputScreen({props}) {
  const {expression, bottomInput} = props;

  return (
    <div id="input-screen" className="row">
      <div id="top-input">{expression}</div>
      <h2 id="bottom-input">{bottomInput}</h2>
    </div>
  );
}
