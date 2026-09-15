import { create } from 'zustand';

type PlayerState = {
  level: number;
  exp: number;
  coins: number;
  addExp: (amount: number) => void;
};

export const usePlayerStore = create<PlayerState>(set => ({
  level: 1,
  exp: 0,
  coins: 100,
  addExp: amount => set(state => ({ exp: state.exp + amount })),
}));
