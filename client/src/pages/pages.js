import Home from "./Home";
import Monitor from "./Monitor";

export default function (action) {
  switch (action) {
    case "Budget":
      return 1;
    case "Monitor":
      return 2;
    default:
      return 1;
  }
}
/* export function openBudget() {
  return <Home />;
}

export function openMonitor() {
  return <Monitor />;
} */