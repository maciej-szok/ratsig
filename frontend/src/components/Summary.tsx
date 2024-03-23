import {createSignal, Show} from "solid-js";
import globalStore from "../stores/globalStore.ts";
import {generateSummary} from "../api/summary.ts";

function Summary() {
  const [summary, setSummary] = createSignal<string>('');
  const appState = globalStore.appState;

  const generateSummaryHandler = async () => {
    const currentDate = appState.data.selectedDate;
    const weekBefore = new Date(new Date().setUTCDate(currentDate.getUTCDate() - 7));
    console.log(currentDate, weekBefore);

    const [success, smr] = await generateSummary(weekBefore, currentDate);
    if(success){
      setSummary(smr.summary);
    }else{
      alert('failed to generate summary');
    }
  }

  return (
    <div>
      <h1>Summary</h1>
      <Show when={summary()} fallback={<span class="text-gray-500">Generate summary first</span>}>
        <p>
          {summary()}
        </p>
      </Show>
      <button class="border border-green-200" onClick={generateSummaryHandler}>Create summary of the last week</button>
    </div>
  )
}

export default Summary;