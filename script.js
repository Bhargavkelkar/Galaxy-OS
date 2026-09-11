// Top Bar Clock Display
function updateClock() {
  const now = new Date();
  const options = { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  document.getElementById('top-clock').innerText = now.toLocaleDateString('en-US', options);
}
setInterval(updateClock, 1000);
updateClock();

// Window Show/Hide Logic
function openWindow(id) {
  const win = document.getElementById(id);
  win.classList.remove('hidden');
  bringToFront(win);
}

function closeWindow(id) {
  document.getElementById(id).classList.add('hidden');
}

function bringToFront(win) {
  document.querySelectorAll('.window').forEach(w => w.style.zIndex = '20');
  win.style.zIndex = '30';
}

document.querySelectorAll('.window').forEach(win => {
  win.addEventListener('mousedown', () => bringToFront(win));
});

// Window Dragging Logic
let activeWindow = null, offsetX = 0, offsetY = 0;

function startDrag(e, windowId) {
  activeWindow = document.getElementById(windowId);
  bringToFront(activeWindow);
  offsetX = e.clientX - activeWindow.offsetLeft;
  offsetY = e.clientY - activeWindow.offsetTop;
  document.addEventListener('mousemove', onDrag);
  document.addEventListener('mouseup', stopDrag);
}

function onDrag(e) {
  if (!activeWindow) return;
  activeWindow.style.left = (e.clientX - offsetX) + 'px';
  activeWindow.style.top = (e.clientY - offsetY) + 'px';
}

function stopDrag() {
  activeWindow = null;
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', stopDrag);
}

// Interactive Terminal
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');

if (terminalInput) {
  terminalInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      const command = this.value.trim().toLowerCase();
      this.value = '';
      let printText = `<p><span class="prompt">user@galaxy-os:~#</span> ${command}</p>`;

      if (command === 'help') {
        printText += `<p>Commands: <span class="highlight">help</span>, <span class="highlight">clear</span>, <span class="highlight">about</span></p>`;
      } else if (command === 'clear') {
        terminalOutput.innerHTML = '';
        return;
      } else if (command === 'about') {
        printText += `<p>GALAXY OS v1.0 -- Built for Hack Club WebOS 1</p>`;
      } else if (command !== '') {
        printText += `<p>Unknown command: '${command}'</p>`;
      }

      terminalOutput.innerHTML += printText;
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
  });
}