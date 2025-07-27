let moment = 0;
let running = false;
let muted = false;
let pace = 1;
let timer;

function format(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" + secs : secs}`;
}

function render() {
  document.getElementById("bar").value = Math.floor(moment / 10);
  document.getElementById("timeLabel").textContent = `${format(moment)} / 4:00`;
}

function syncTime() {
  moment = document.getElementById("bar").value * 10;
  render();
}

function start() {
  if (!running) {
    running = true;
    timer = setInterval(() => {
      moment += pace;
      if (moment >= 240) {
        moment = 240;
        pause();
      }
      render();
    }, 1000);
  }
}

function pause() {
  running = false;
  clearInterval(timer);
  render();
}

function back10() {
  moment = Math.max(0, moment - 10);
  render();
}

function back5() {
  moment = Math.max(0, moment - 5);
  render();
}

function skip5() {
  moment = Math.min(240, moment + 5);
  render();
}

function skip10() {
  moment = Math.min(240, moment + 10);
  render();
}

function setVolume() {
  const volValue = document.getElementById("vol").value;
  document.getElementById("volDisplay").textContent = volValue;
  if (volValue == 0 && !muted) {
    muted = true;
    document.getElementById("muteToggle").textContent = "Unmute";
  } else if (volValue > 0 && muted) {
    muted = false;
    document.getElementById("muteToggle").textContent = "Mute";
  }
}

function muteUnmute() {
  muted = !muted;
  document.getElementById("muteToggle").textContent = muted ? "Unmute" : "Mute";
  document.getElementById("vol").value = muted ? 0 : 100;
  document.getElementById("volDisplay").textContent = muted ? "0" : "100";
}

function adjustSpeed() {
  const speeds = [0.25, 0.5, 1, 2];
  pace = speeds[document.getElementById("spd").value];
  document.getElementById("spdLabel").textContent = pace + "x";
}
