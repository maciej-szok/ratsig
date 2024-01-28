import {createSignal} from "solid-js";

function Editor () {
  const [value, setValue] = createSignal("");

  return (
    <div>
      <h1>Editor</h1>
      <textarea
        value={value()}
        onChange={(e) => setValue(e.target.value)}
        style={{ width: '100%', height: '200px' }}
      />
    </div>
  );
}

export default Editor;