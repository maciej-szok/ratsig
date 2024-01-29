import Editor from "../Editor.tsx";
import {createEffect, createSignal} from "solid-js";
import globalStore from "../../stores/globalStore.ts";
import {createEntry, getEntry, updateEntry} from "../../api/entry.ts";

function DayEditorPanel() {
  const [value, setValue] = createSignal('');

  const { appState } = globalStore;

  const saveEntry = async () => {
    // TODO save as below, proper error checking needed

    console.log('saving entry');
    const [success, _] = await updateEntry(appState.data.selectedDate, value());
    if (success) {
      console.log('saved entry');
      return;
    }

    console.warn('error saving entry, must be created');
    const [createSuccess, __] = await createEntry(appState.data.selectedDate, value());

    if(!createSuccess) {
      console.warn('error creating entry');
    }
  }

  createEffect(async () => {
    if(!appState.data.selectedDate || !appState.isAuthenticated){
      return;
    }

    const [success, entry] = await getEntry(appState.data.selectedDate);
    if (success) {
      setValue(entry.content);
    } else {
      // TODO check if it was 404 or something else
      //  to not overwrite the entry with an empty string in case of an error!
      console.warn('Error fetching entry, maybe does not exist yet');
      setValue('');
    }
  });

  return (
    <div>
      <Editor value={value()} onChange={(v) => setValue(v)}/>
      <button class="border border-gray-900 m-2" onClick={saveEntry}>SAVE</button>
    </div>
  )
}

export default DayEditorPanel;