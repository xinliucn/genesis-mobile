import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type PlayerState = {
  level: number;
  exp: number;
  coins: number;
  addExp: (amount: number) => void;
  addCoins: (amount: number) => void;
  grantReward: (exp: number, coins: number) => void;
};

export const usePlayerStore = create<PlayerState>()(
  persist(
    set => ({
      level: 1,
      exp: 0,
      coins: 100,
      addExp: amount => set(state => ({ exp: state.exp + amount })),
      addCoins: amount => set(state => ({ coins: state.coins + amount })),
      grantReward: (exp, coins) =>
        set(state => ({
          exp: state.exp + exp,
          coins: state.coins + coins,
        })),
    }),
    {
      name: 'genesis-player-storage-v1',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({ level: state.level, exp: state.exp, coins: state.coins }),
    },
  ),
);
