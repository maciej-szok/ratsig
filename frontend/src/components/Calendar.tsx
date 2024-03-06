import {createEffect, createSignal, For, Show} from 'solid-js';

type CalendarProps = {
  selectedDate?: Date;
  onDateSelected: (date: Date) => void;
};

function Calendar(props: CalendarProps) {
  const [grid, setGrid] = createSignal<Array<Array<number>>>([[]]);
  const [monthName, setMonthName] = createSignal<string>('');

  createEffect(() => {
    if(!props.selectedDate) {
      return;
    }

    console.log('selected date changed', props.selectedDate)

    // Get the first day of the current month
    let firstDay = new Date(props.selectedDate.getFullYear(), props.selectedDate.getMonth(), 1);

    // Get the last day of the current month
    let lastDay = new Date(props.selectedDate.getFullYear(), props.selectedDate.getMonth() + 1, 0);

    // Calculate the number of days in the current month
    let daysInMonth = lastDay.getDate();

    // Create a 7x5 grid and fill it with the days of the current month
    let tempGrid: Array<Array<number>> = [[]];
    for (let i = 0; i < 5; i++) {
      tempGrid[i] = [];
      for (let j = 0; j < 7; j++) {
        let day = i * 7 + j - firstDay.getDay() + 2;
        if (day > 0 && day <= daysInMonth) {
          tempGrid[i][j] = day;
        } else {
          tempGrid[i][j] = -1;
        }
      }
    }

    setGrid(tempGrid);
    setMonthName(props.selectedDate?.toLocaleString('default', { month: 'long' }));
  });

  return (
    <div class="text-center">
      <h1>{props.selectedDate?.getFullYear()} - {monthName()}</h1>
      <div class="aspect-square grid grid-cols-7 grid-rows-7">
        <For each={grid()}>
          {(week) => (
            <For each={week}>
              {(day) => (
                <button
                  class="aspect-square flex justify-center items-center border shadow"
                  classList={{
                    'bg-green-200': day === props.selectedDate?.getDate(),
                  }}
                  // on mouse down for more responsive feel
                  onMouseDown={() => props.selectedDate && props.onDateSelected(new Date(props.selectedDate?.getFullYear(), props.selectedDate?.getMonth(), day))}
                >
                  <Show when={day > 0}>
                    <span>{day}</span>
                  </Show>
                </button>
              )}
            </For>
          )}
        </For>
      </div>
    </div>
  );
}

export default Calendar;