import { defineStore } from "pinia";

export const useAppStore = defineStore("appStore", {
  state: () => {
    return {
      days: null,
      locationName: null,
      tempC: null,
      dayInfo: null,
      dayDate: null,
      activeHour: null,
    };
  },
  actions: {
    setDays(data) {
      this.days = data;
    },
  },
});
