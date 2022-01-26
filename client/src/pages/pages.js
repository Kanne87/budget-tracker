export default function (action) {
  switch (action) {
    case "Budget":
      return 1;
    case "Monitor":
      return 2;
    case "Einstellungen":
      return 3;
    default:
      return 0;
  }
}
