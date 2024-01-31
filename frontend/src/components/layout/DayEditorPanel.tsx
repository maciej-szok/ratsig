import Editor from "../Editor.tsx";
import {createEffect} from "solid-js";
import globalStore from "../../stores/globalStore.ts";
import {createEntry, getEntry, updateEntry} from "../../api/entry.ts";
import {dateToIso} from "../../utils/date.ts";
import {data} from "autoprefixer";

function DayEditorPanel() {
  const { appState, setAppState } = globalStore;

  const saveEntry = async () => {
    // // TODO save as below, proper error checking needed
    //
    // console.log('saving entry');
    // const [success, _] = await updateEntry(appState.data.selectedDate, value());
    // if (success) {
    //   console.log('saved entry');
    //   return;
    // }
    //
    // console.warn('error saving entry, must be created');
    // const [createSuccess, __] = await createEntry(appState.data.selectedDate, value());
    //
    // if(!createSuccess) {
    //   console.warn('error creating entry');
    // }
  }

  const fetchEntry = async (date: Date) => {
    const [success, entry] = await getEntry(date);
    if (success) {
      // setAppState('data', 'entries', dateToIso(date), 'content', entry.content);
    } else {
      // TODO check if it was 404 or something else
      //  to not overwrite the entry with an empty string in case of an error!
      console.warn('Error fetching entry, maybe does not exist yet');
    }
  }


  createEffect(async () => {
    if(!appState.data.selectedDate || !appState.isAuthenticated){
      return;
    }

    await fetchEntry(appState.data.selectedDate);
  });z

  // const editorValue = globalStore.appState.data.selectedDate ? globalStore.appState.data.entries[dateToIso(globalStore.appState.data.selectedDate)].content : '';

  return (
    <div>
      <Editor value={editorValue} onInput={(v) => {
        if(!appState.data.selectedDate) {
          return;
        }
        // set the value in the global store
      }} />
      <button class="border border-gray-900 m-2" onClick={saveEntry}>SAVE</button>
    </div>
  )
}

export default DayEditorPanel;