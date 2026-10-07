const skills = ["cube","ship","ball","ufo","wave","robot","spider"];

const labels = ["Cube","Ship","Ball","UFO","Wave","Robot","Spider"];

const ctx = document.getElementById("skillChart");

const chart = new Chart(ctx, {
  type: "radar",
  data: {
    labels: labels,
    datasets: [{
      label: "Skill Level",
      data: [50,50,50,50,50,50,50],
      borderWidth: 3
    }]
  },
  options: {
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: { display: false }
      }
    }
  }
});

// update chart from sliders
function updateChart() {
  const data = skills.map(id => Number(document.getElementById(id).value));
  chart.data.datasets[0].data = data;
  chart.update();
}

// attach listeners
skills.forEach(id => {
  const slider = document.getElementById(id);
  const label = document.getElementById(id + "Value");

  slider.addEventListener("input", () => {
    label.textContent = slider.value;
    updateChart();
  });
});

// improved recommendation system
function generateRecommendations() {

  const values = {};
  skills.forEach(id => {
    values[id] = Number(document.getElementById(id).value);
  });

  const recs = [];

  // Wave weakness path (important for GD progression)
  if (values.wave < 40) {
    recs.push({
      title: "Wave Training Route",
      list: [
        "Problematic",
        "Ultra Paracosm",
        "Fairydust",
        "Nine Circles"
      ]
    });
  }

  // Ship control route
  if (values.ship < 40) {
    recs.push({
      title: "Ship Control Path",
      list: [
        "Electrodynamix",
        "Windy Landscape",
        "Hypersonic practice"
      ]
    });
  }

  // Balanced → Extreme path
  const avg = Object.values(values).reduce((a,b)=>a+b,0)/7;

  if (avg > 70) {
    recs.push({
      title: "Extreme Demon Progression",
      list: [
        "Cataclysm",
        "Acu",
        "Bloodbath",
        "Zodiac practice routes"
      ]
    });
  }

  if (recs.length === 0) {
    recs.push({
      title: "Starter Progression Path",
      list: [
        "The Nightmare",
        "Death Moon",
        "Clubstep",
        "Deadlocked"
      ]
    });
  }

  display(recs);
}

// render recommendations
function display(recs) {

  const box = document.getElementById("recommendations");
  box.innerHTML = "";

  recs.forEach(r => {
    const div = document.createElement("div");
    div.className = "rec";

    div.innerHTML = `
      <h3>${r.title}</h3>
      <p>${r.list.join(" → ")}</p>
    `;

    box.appendChild(div);
  });
}
