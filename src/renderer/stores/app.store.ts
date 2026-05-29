import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type AppState = {};

export const useAppStore = create<AppState>()(immer((set) => ({})));
