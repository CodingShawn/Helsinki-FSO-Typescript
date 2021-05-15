export function calculateBMI(height: number, weight: number): string {
  let bmi = weight / Math.pow(height / 100, 2);

  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi < 25) {
    return "Normal (healthy weight)";
  } else return "Overweight";
}

function parseArguments(args: Array<string>) {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
}

export function script() {
  try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBMI(height, weight));
  } catch (error) {
    console.log(`Error, something bad happened. Message:`, error.message);
  }
}
