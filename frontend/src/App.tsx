import './App.css'
import Panel from "./components/layout/Panel.tsx";
import DayEditorPanel from "./components/layout/DayEditorPanel.tsx";
import Calendar from "./components/Calendar.tsx";
import {Match, onMount, Switch} from "solid-js";
import globalStore from "./stores/globalStore.ts";
import Landing from "./components/layout/Landing.tsx";
import {logOut, refreshAuth} from "./services/authProvider.ts";

function App() {
  const {appState, setAppState} = globalStore;

  onMount(() => {
    // TODO some loader taking the whole page would be nice here
    //  so that the interface does not jump around
    void refreshAuth();
  });

  return (
    <Switch fallback={<div>Not Found</div>}>
      <Match when={appState.isAuthenticated}>
        <div class="h-full">
          <header style={{height: '60px'}} class="border-b-2 border-gray-900">
            <nav class="h-full flex justify-between">
              <div>
                <span>RATSIG LOGO</span>
              </div>
              <div>
                <button class="border border-gray-900 m-2" onClick={logOut}>LOG OUT</button>
                <span class="bg-green-200">PROFILE</span>
              </div>
            </nav>
          </header>

          <div class="grid grid-cols-12 grid-rows-1 h-full p-2 gap-2">
            <Panel class="col-span-5">
              <Calendar selectedDate={appState.data.selectedDate} onDateSelected={(d) => setAppState('data', 'selectedDate', d)}/>
            </Panel>
            <Panel class="col-span-7">
              <DayEditorPanel />
            </Panel>
          </div>
        </div>
      </Match>
      <Match when={!appState.isAuthenticated}>
        <Landing />
      </Match>
    </Switch>


  )
}

export default App
