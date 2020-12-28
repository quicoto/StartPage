
const _$ = {};

function _setElements() {
  _$.date = document.getElementById('date');
  _$.time = document.getElementById('time');
  _$.greeting = document.getElementById('greeting');
  _$.todoList = document.getElementById('todo-list');
}

function addOrdinalSuffix(i) {
    const j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

function _setTimeAndDate() {
  const now = new Date();
  const hours = `${now.getHours()}`.padStart(2, '0');
  const minutes = `${now.getMinutes()}`.padStart(2, '0');
  const dayOfTheWeek = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(now);
  const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(now);
  const day = new Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(now);
  const year = new Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(now);


  _$.date.innerHTML = `${dayOfTheWeek}, ${month} ${addOrdinalSuffix(+day)} ${year}`;
  _$.time.innerHTML = `${hours}<span class="time-separator">:</span>${minutes}`;
}

function _setGreeting() {
  let greeting = '';
  const now = new Date();
  const hour = now.getHours();

  if (hour >= 0) greeting = "😡 Go to sleep";
  if (hour >= 4) greeting = "😪 It's too early";
  if (hour >= 8) greeting = '🥱 Good morning';
  if (hour >= 12) greeting = '🙂 Good afternoon';
  if (hour >= 18) greeting = '😌 Good evening';
  if (hour >= 21) greeting = '👋 Good night';

  _$.greeting.innerHTML = greeting;
}

function renderTodos(data) {
  if (_$.todoList) {
    let output = '';

    if (data.length > 0) {
      data.forEach((todo) => {
        if (todo.done === false) {
          output += `<li>${todo['clean-title']}</li>`;
        }
      });

      output = `<ul>${output}</ul>`;
    } else {
      output = '<p>No items left, well done! 👏</p>';
    }

    _$.todoList.innerHTML = output;
  }
}

function init() {
  _setElements();
  _setTimeAndDate();
  _setGreeting();
  window.setInterval(_setTimeAndDate, 500);
}

init();