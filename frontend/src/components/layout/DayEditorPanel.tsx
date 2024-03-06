import Editor from "../Editor.tsx";
import {createEffect} from "solid-js";
import globalStore from "../../stores/globalStore.ts";
import {createEntry, getEntry, updateEntry} from "../../api/entry.ts";
import {dateToIso} from "../../utils/date.ts";

function DayEditorPanel() {
  const {appState, setAppState} = globalStore;

  const saveEntry = async (date: string) => {
    // TODO save as below, proper error checking needed

    const value = appState.data.entries[date]?.content || '';

    console.log('saving entry');
    const [success, _] = await updateEntry(appState.data.selectedDate, value);
    if (success) {
      console.log('saved entry');
      return;
    }

    console.warn('error saving entry, must be created');
    const [createSuccess, __] = await createEntry(appState.data.selectedDate, value);

    if(!createSuccess) {
      console.warn('error creating entry');
    }
  }

  const fetchEntry = async (date: Date) => {
    console.log('fetching entry');
    const [success, entry] = await getEntry(date);
    console.log('e', entry)
    if (success) {
      setAppState('data', 'entries', dateToIso(date), (prevState) => {
        return {
          ...(prevState || {}),
          content: entry.content,
        }
      });
    } else {
      // TODO check if it was 404 or something else
      //  to not overwrite the entry with an empty string in case of an error!
      console.warn('Error fetching entry, maybe does not exist yet');
      // if really does not exist, create an empty entry
      setAppState('data', 'entries', dateToIso(date), (prevState) => {
        return {
          ...(prevState || {}),
          content: '',
        }
      });
    }
  }


  createEffect(async () => {
    if (!appState.data.selectedDate || !appState.isAuthenticated) {
      return;
    }

    await fetchEntry(appState.data.selectedDate);
  });

  return (
    <div>
      <Editor value={appState.data.entries[dateToIso(globalStore.appState.data.selectedDate)]?.content || ''} onInput={(value) => {
        if (!appState.data.selectedDate) {
          return;
        }
        setAppState('data', 'entries', dateToIso(appState.data.selectedDate), (prevState) => {
          return {
            ...(prevState || {}),
            content: value,
          }
        });
        // set the value in the global store
      }}/>
      <button class="border border-gray-900 m-2" onClick={() => saveEntry(dateToIso(appState.data.selectedDate))}>SAVE</button>
    </div>
  );
}

export default DayEditorPanel;