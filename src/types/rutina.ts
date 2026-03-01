export interface ExerciseGroup {
  name?: string;
  exercises: string[];
}

export interface DayRoutine {
  id: string;
  day: string;
  groups: ExerciseGroup[];
}

export interface UserRoutine {
  name: string;
  note?: string;
  rutina: DayRoutine[];
}

export type UserId = "pablo" | "victoria";
