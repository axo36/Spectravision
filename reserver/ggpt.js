/* ---------------------------
      GESTION DES DATES
---------------------------- */

const totalDays = 20;
const visibleCount = 9;
let startIndex = 0;

function formatDateLabel(date, index) {
  const jours = ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."];
  const mois = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];

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


/* ---------------------------
   PANNEAU LATÉRAL (DEVTOOLS)
---------------------------- */

function openPanel() {function openPanelFromButton(btn) {
  const hour = btn.querySelector(".session-hour")?.textContent || "";
  const end = btn.querySelector(".session-end")?.textContent?.replace("→ ", "") || "";
  const film = btn.querySelector(".session-version")?.textContent || "";
  const version = btn.querySelector("h2.movie-title")?.textContent || "";
  const formatImg = btn.querySelector("img")?.getAttribute("alt") || "";
  const salle = formatImg.includes("IMAX") ? "Salle IMAX" :
                formatImg.includes("4DX") ? "Salle 4DX" :
                formatImg.includes("VIP") ? "Salle VIP" : "Salle 1";

  const panel = document.getElementById("side-panel");
  panel.classList.add("open");

  panel.querySelector(".panel-content").innerHTML = `
    <h2>${film} — ${formatImg} — ${version}</h2>
    <p><strong>Début :</strong> ${hour}</p>
    <p><strong>Fin prévue :</strong> ${end}</p>
    <p><strong>Salle :</strong> ${salle}</p>
    <button class="btn-reserver">Télécharger l'app</button>
    <button class="close-panel" onclick="closePanel()">Fermer</button>
  `;
}

function closePanel() {
  document.getElementById("side-panel").classList.remove("open");
}

document.querySelectorAll(".session-btn").forEach(btn => {
  btn.addEventListener("click", () => openPanelFromButton(btn));
});

}

function closePanel() {
  document.getElementById("side-panel").classList.remove("open");
}

/* Ouvre le panneau quand on clique sur une séance */
document.querySelectorAll(".session-btn").forEach(btn => {
  btn.addEventListener("click", openPanel);
});
