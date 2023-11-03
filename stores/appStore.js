import { defineStore } from "pinia";

export const useAppStore = defineStore("appStore", {
  state: () => {
    return {
      days: [],
    };
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});
