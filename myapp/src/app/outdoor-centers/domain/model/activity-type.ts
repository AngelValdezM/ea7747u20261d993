export const ACTIVITY_TYPES = [
  'hiking',
  'running',
  'cycling',
  'trekking'
] as const;

export type ActivitiesType = typeof ACTIVITY_TYPES[number];
