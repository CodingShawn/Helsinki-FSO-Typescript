function calculateBMI(height: number, weight: number): string {
  let bmi = weight / Math.pow(height / 100, 2);

  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi < 25) {
    return "Normal (healthy weight)";
  } else return "Overweight";
}

console.log(calculateBMI(180, 74));
