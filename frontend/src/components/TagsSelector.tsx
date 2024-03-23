import {getTags} from "../api/tag.ts";
import {createSignal, For} from "solid-js";
import {TagBase} from "../types/tag.ts";
import {updateEntry} from "../api/entry.ts";
import globalStore from "../stores/globalStore.ts";
import {dateToIso} from "../utils/date.ts";

type TagInInterface = {
  selected: boolean;
} & TagBase;

function TagsSelector() {
  const [tags, setTags] = createSignal<TagInInterface[]>([]);
  const [selectedTag, setSelectedTag] = createSignal<number | null>(null);
  const {appState, setAppState} = globalStore;

  const fetchTags = async () => {
    const [success, tags] = await getTags();
    setTags(tags);
    if(tags.length){
      setSelectedTag(tags[0].id);
    }
  }

  const addTag = async () => {
    const entryTags = appState.data.entries[dateToIso(globalStore.appState.data.selectedDate)].tags;

    const newTags = new Set(entryTags.map((t) => t.id) || []);
    const selected = selectedTag();
    if(selected != null){
      newTags.add(selected);
    }
    const [success, entry] = await updateEntry(appState.data.selectedDate, {tags: Array.from(newTags)});
    if (success) {
      console.log('saved entry');
      setAppState('data', 'entries', dateToIso(globalStore.appState.data.selectedDate), (prevState) => {
        return {
          ...(prevState || {}),
          content: entry.content,
          tags: entry.tags
        }
      });
      return;
    }
  }

  void fetchTags();

  return (
    <div>
      <h2>TagsSelector</h2>
      <button onClick={fetchTags} class="m-2 border-green-200 border">Refresh tags</button>
      <select onChange={(e) => setSelectedTag(parseInt(e.target.value))}>
        <For each={tags()}>
          {(tag) => (
            <option value={tag.id}>{tag.text}</option>
          )}
        </For>
      </select>
      <button onClick={addTag} disabled={!selectedTag()}>Add tag</button>
      <span>{JSON.stringify(tags)}</span>
    </div>
  );
}

export default TagsSelector;