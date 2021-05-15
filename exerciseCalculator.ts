/* eslint-disable no-var */
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
  const totalDays = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.reduce((acc, hours) => {
    if (hours > 0) {
      acc++;
    }
    return acc;
  }, 0);
  const averageHoursTrained =
    dailyExerciseHours.reduce((acc, hours) => {
      return acc + hours;
    }, 0) / totalDays;
  const targetReached = averageHoursTrained > targetHours ? true : false;
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
  const numberInput = args.slice(2);
  const toNumberArray = numberInput.map((number) => {
    if (isNaN(Number(number))) {
      throw new Error("Provided values are not numbers!");
    } else {  
      return Number(number);
    }
  });
  const [targetHours, ...dailyExerciseHours] = toNumberArray;
  
  return { targetHours, dailyExerciseHours };
}

try {
  const { targetHours, dailyExerciseHours } = parseArgumentsExerciseCalulator(
    process.argv
  );
  console.log(calculateExercises(dailyExerciseHours, targetHours));
} catch (error) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log("Error something bad happened, error:", error.message);
}
