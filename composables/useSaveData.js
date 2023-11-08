import { useAppStore } from "~/stores/appStore";

export default function saveData() {
  const appStore = useAppStore();

  const saveDataInStore = (newData) => {
    appStore.setDays(newData);
    appStore.tempC = Math.floor(((appStore.days[0].temp - 32) * 5) / 9);
    appStore.dayInfo = appStore.days[0];
    const date = new Date(appStore.dayInfo.datetime);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    appStore.dayDate = date.toLocaleDateString("en-US", options);
    appStore.activeHour = appStore.dayInfo.hours[0];
  };

  return { saveDataInStore };
}
