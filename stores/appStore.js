import { defineStore } from "pinia";

export const useAppStore = defineStore("appStore", {
  state: () => {
    return {
      days: [],
      locationName: null,
      tempC: null,
    };
  },
});
