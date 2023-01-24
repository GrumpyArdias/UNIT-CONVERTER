function calculator(value, num) {
  switch (value) {
    case "km":
      return num * 0.621;
    case "m":
      return num * 3.28;
    case "cm":
      return num * 2.54;

    default:
      return console.log("error");
  }
}

function invertCalculator(value, num) {
  switch (value) {
    case "km":
      return num * 1.61;

    case "m":
      return num * 0.3;
    case "cm":
      return num * 0.393;

    default:
      return console.log("error");
  }
}

export { calculator, invertCalculator };
