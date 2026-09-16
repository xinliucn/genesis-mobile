import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { starterTasks } from '../features/task/taskData';
import type { Task } from '../types/task';

export type TaskRecord = {
  taskId: string;
  date: string;
  completedAt: string;
  expReward: number;
  coinReward: number;
};

type CompleteResult = {
  completed: boolean;
  expReward: number;
  coinReward: number;
};

type TaskState = {
  tasks: Task[];
  records: TaskRecord[];
  addTask: (task: Task) => void;
  completeTask: (taskId: string) => CompleteResult;
};

export const getLocalDateKey = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: starterTasks,
      records: [],
      addTask: task => set(state => ({ tasks: [task, ...state.tasks] })),
      completeTask: taskId => {
        const task = get().tasks.find(item => item.id === taskId);
        const date = getLocalDateKey();
        if (!task || get().records.some(record => record.taskId === taskId && record.date === date)) {
          return { completed: false, expReward: 0, coinReward: 0 };
        }

        const record: TaskRecord = {
          taskId,
          date,
          completedAt: new Date().toISOString(),
          expReward: task.expReward,
          coinReward: task.coinReward,
        };

        set(state => ({ records: [...state.records, record] }));
        return { completed: true, expReward: task.expReward, coinReward: task.coinReward };
      },
    }),
    {
      name: 'genesis-task-storage-v1',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({ tasks: state.tasks, records: state.records }),
    },
  ),
);

export const isTaskCompletedToday = (taskId: string, records: TaskRecord[]) => {
  const today = getLocalDateKey();
  return records.some(record => record.taskId === taskId && record.date === today);
};
