import { defineStore } from "pinia";

export const useAppStore = defineStore("appStore", {
  state: () => {
    return { count: 0 };
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});
