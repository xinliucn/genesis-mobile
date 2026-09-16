export type TaskCategory =
  | 'health'
  | 'fitness'
  | 'diet'
  | 'sleep'
  | 'study'
  | 'work'
  | 'life'
  | 'custom';

export type TaskType = 'one_off' | 'daily' | 'weekly' | 'habit' | 'milestone' | 'system';

export type Task = {
  id: string;
  title: string;
  description?: string;
  category: TaskCategory;
  type: TaskType;
  expReward: number;
  coinReward: number;
  completed: boolean;
  target?: number;
  current?: number;
  unit?: string;
};
