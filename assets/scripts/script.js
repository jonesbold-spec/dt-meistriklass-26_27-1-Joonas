function initPage() {
  const weekday = document.getElementById("weekday");
  const day = document.getElementById("day");
  const month = document.getElementById("month");
  const year = document.getElementById("year");

  function setDate(time) {
    weekday.innerText = time.weekdayName;
    day.innerText = pad(time.dayOfMonth);
    month.innerText = time.monthName;
    year.innerText = pad(time.year);
  }
  setDate(TIME.now());
  TIME.on("day", (time) => {
    setDate(time);
  });

  const CENTER = 200;
  const RADII = { hour: 60, minute: 120, second: 180 };

  function pointOnCircle(radius, progress) {
    const angle = progress * Math.PI * 2 - Math.PI / 2; // 0 = kell 12
    return {
      x: CENTER + radius * Math.cos(angle),
      y: CENTER + radius * Math.sin(angle),
    };
  }

  function setClock(time) {
    // TIME objekti progress-väärtused (0–1)
    const progress = {
      second: time.secondsProgress,
      minute: time.minutesProgress,
      hour: (time.hoursProgress * 2) % 1, // 12-tunnine ring
    };

    const points = {};
    for (const name in progress) {
      points[name] = pointOnCircle(RADII[name], progress[name]);
    }

    document.getElementById("triangle").setAttribute(
      "points",
      Object.values(points)
        .map((p) => `${p.x},${p.y}`)
        .join(" "),
    );
  }

  setClock(TIME.now());
  TIME.on("second", (time) => {
    setClock(time);
  });
}

document.addEventListener("DOMContentLoaded", initPage);