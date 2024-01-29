type EditorProps = {
  value: string;
  onChange: (value: string) => void;
}

function Editor (props: EditorProps) {
  return (
    <div>
      <h1>Editor</h1>
      <textarea
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        style={{ width: '100%', height: '400px', "font-family": "monospace"}}
        class="border border-gray-900 bg-white p-2"
        placeholder="Write your entry here..."
      />
    </div>
  );
}

export default Editor;