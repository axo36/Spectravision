const totalDays = 20;
const visibleCount = 9;
let startIndex = 0;

function formatDateLabel(date, index) {
  const jours = ["DIM.", "LUN.", "MAR.", "MER.", "JEU.", "VEN.", "SAM."];
  const mois = ["JANV.", "FÉVR.", "MARS", "AVR.", "MAI", "JUIN", "JUIL.", "AOÛT", "SEPT.", "OCT.", "NOV.", "DÉC."];

  if (index === 0) return "Aujourd'hui";
  if (index === 1) return "Demain";

  const jour = jours[date.getDay()];
  const jourNum = date.getDate();
  const moisNom = mois[date.getMonth()];
  return `${jour} ${jourNum} ${moisNom}`;
}

function renderDates() {
  const container = document.getElementById("dates");
  container.innerHTML = "";

  const today = new Date();

  for (let i = startIndex; i < startIndex + visibleCount && i < totalDays; i++) {
    const d = new Date();
    d.setDate(today.getDate() + i);

    const btn = document.createElement("button");
    btn.className = "date-btn" + (i === startIndex ? " active" : "");
    btn.textContent = formatDateLabel(d, i);
    btn.onclick = () => selectDate(i);
    container.appendChild(btn);
  }
}

function scrollDates(direction) {
  startIndex += direction;
  if (startIndex < 0) startIndex = 0;
  if (startIndex > totalDays - visibleCount) startIndex = totalDays - visibleCount;
  renderDates();
}

function selectDate(index) {
  const buttons = document.querySelectorAll(".date-btn");
  buttons.forEach(btn => btn.classList.remove("active"));
  buttons[index - startIndex]?.classList.add("active");
}

renderDates();
