const PHILOSOPHERS = [
  { name: "Marcus Aurelius", works: "Meditations", era: "121–180 CE" },
  { name: "Seneca", works: "Letters from a Stoic, On the Shortness of Life", era: "4 BCE–65 CE" },
  { name: "Epictetus", works: "Discourses, Enchiridion", era: "50–135 CE" },
  { name: "Musonius Rufus", works: "Lectures", era: "30–101 CE" },
  { name: "Zeno of Citium", works: "fragments via later sources", era: "334–262 BCE" },
  { name: "Cato the Younger", works: "historical example of virtue", era: "95–46 BCE" },
];

const SEASONS = ["winter", "spring", "summer", "autumn"];

const WEEKDAY_ANGLES = {
  Monday: "beginning the week with intention and discipline",
  Tuesday: "steady effort without needing motivation",
  Wednesday: "perseverance at the midpoint of the week",
  Thursday: "gratitude and perspective before the week ends",
  Friday: "finishing well and not coasting",
  Saturday: "leisure, reflection, and self-examination",
  Sunday: "preparation, rest, and what is within your control",
};

export function getDateContext(date = new Date()) {
  const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
  const month = date.toLocaleDateString("en-US", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();

  const start = new Date(year, 0, 0);
  const dayOfYear = Math.floor((date - start) / 86_400_000);

  const season = SEASONS[Math.floor(((date.getMonth() + 1) % 12) / 3)];
  const featuredPhilosopher = PHILOSOPHERS[dayOfYear % PHILOSOPHERS.length];

  const displayDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return {
    displayDate,
    weekday,
    month,
    day,
    year,
    dayOfYear,
    season,
    featuredPhilosopher,
    weekdayAngle: WEEKDAY_ANGLES[weekday] ?? "living with clarity today",
    varietySeed: dayOfYear + year * 367 + day,
  };
}
