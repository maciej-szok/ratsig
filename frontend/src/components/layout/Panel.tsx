import {JSX, ParentProps} from "solid-js";

function Panel({ children, ...props }: ParentProps & JSX.HTMLAttributes<{}>) {
  return (
    <div class={props.class + " h-full w-full panel rounded-md shadow-xl border border-gray-100"}>
      {children}
    </div>
  );
}

export default Panel;