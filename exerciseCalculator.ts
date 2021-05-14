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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
