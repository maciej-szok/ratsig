import {getTags} from "../api/tag.ts";
import {createSignal, For} from "solid-js";
import {TagBase} from "../types/tag.ts";
import {updateEntry} from "../api/entry.ts";
import globalStore from "../stores/globalStore.ts";

type TagInInterface = {
  selected: boolean;
} & TagBase;

function TagsSelector() {
  const [tags, setTags] = createSignal<TagInInterface[]>([]);
  const [selectedTag, setSelectedTag] = createSignal<number | null>(null);
  const {appState} = globalStore;

  const fetchTags = async () => {
    const [success, tags] = await getTags();
    setTags(tags);
    console.log('tags', tags);
  }

  const addTag = async () => {
    console.log('add tag', selectedTag())
    console.log('saving entry');
    // const [success, _] = await updateEntry(appState.data.selectedDate, {tags: value});
    // if (success) {
    //   console.log('saved entry');
    //   return;
    // }
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
      <button onClick={addTag}>Add tag</button>
      <span>{JSON.stringify(tags)}</span>
    </div>
  );
}

export default TagsSelector;