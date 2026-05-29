import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type ProjectState = {
  projects: DBC.IProject[];

  setProjects: (newProjects: DBC.IProject[]) => void;
};

export const useProjectStore = create<ProjectState>()(
  immer((set) => ({
    projects: [],

    setProjects: (newProjects) =>
      set((state) => {
        state.projects = newProjects;
      }),
  })),
);
