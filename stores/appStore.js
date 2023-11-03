import { defineStore } from "pinia";

export const useAppStore = defineStore("appStore", {
  state: () => {
    return {
      days: null,
      locationName: null,
      tempC: null,
    };
  },
});
