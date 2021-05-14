interface Result {
  totalDays: number;
  trainingDays: number;
  targetHours: number;
  averageHoursTrained: number;
  targetReached: boolean;
  rating: number;
  ratingDescription: string;
}

function calculateExercises(
  dailyExerciseHours: Array<number>,
  targetHours: number
): Result {
  let totalDays = dailyExerciseHours.length;
  let trainingDays = dailyExerciseHours.reduce((acc, hours) => {
    if (hours > 0) {
      acc++;
    }
    return acc;
  }, 0);
  let averageHoursTrained =
    dailyExerciseHours.reduce((acc, hours) => {
      return acc + hours;
    }, 0) / totalDays;
  let targetReached = averageHoursTrained > targetHours ? true : false;
  if (averageHoursTrained - targetHours < 0) {
    var rating = 1;
  } else if (averageHoursTrained === targetHours) {
    var rating = 2;
  } else {
    var rating = 3;
  }

  if (rating === 1) {
    var ratingDescription = "Didn't hit target";
  } else if (rating === 2) {
    var ratingDescription = "Just hit target";
  } else {
    var ratingDescription = "Exceeded expecations!";
  }
  return {
    totalDays,
    trainingDays,
    targetHours,
    averageHoursTrained,
    targetReached,
    rating,
    ratingDescription,
  };
}

function parseArgumentsExerciseCalulator(args: Array<string>) {
  if (args.length < 4) {
    throw new Error("Minimum 2 arguments must be provided!");
  }
  let numberInput = args.slice(2);
  let toNumberArray = numberInput.map((number) => {
    if (isNaN(Number(number))) {
      throw new Error("Provided values are not numbers!");
    } else {  
      return Number(number);
    }
  });
  let [targetHours, ...dailyExerciseHours] = toNumberArray;
  
  return { targetHours, dailyExerciseHours };
}

try {
  const { targetHours, dailyExerciseHours } = parseArgumentsExerciseCalulator(
    process.argv
  );
  console.log(calculateExercises(dailyExerciseHours, targetHours));
} catch (error) {
  console.log("Error something bad happened, error:", error.message);
}
