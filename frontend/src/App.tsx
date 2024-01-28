import './App.css'
import Panel from "./components/layout/Panel.tsx";
import EditorPanel from "./components/layout/EditorPanel.tsx";
import Calendar from "./components/Calendar.tsx";
import {createEffect, createSignal} from "solid-js";

function App() {
  const [selectedDate, setSelectedDate] = createSignal(new Date());

  createEffect(() => {
    console.log('selected date changed', selectedDate())
  });

  return (
    <div class="h-full">
      <header style={{height: '60px'}} class="border-b-2 border-gray-900">
        <nav class="h-full flex justify-between">
          <div>
            <span>RATSIG LOGO</span>
          </div>
          <div>
            <button class="h-full bg-green-200">PROFILE</button>
          </div>
        </nav>
      </header>

      <div class="grid grid-cols-12 grid-rows-1 h-full p-2 gap-2">
        <Panel class="col-span-5">
          <Calendar selectedDate={selectedDate()} onDateSelected={(d) => setSelectedDate(d)}/>
        </Panel>
        <Panel class="col-span-7">
          <EditorPanel />
        </Panel>
      </div>
    </div>
  )
}

export default App
