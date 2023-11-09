<template>
  <div class="container">
    <div
      class="container__left h-100 w-75 d-flex flex-column justify-space-between align-end"
    >
      <nav class="container__left__navbar d-flex justify-end pa-4">
        <h4 class="navbar-date text-h6">{{ appStore.dayDate }}</h4>
        <h4 class="navbar-time ml-5 text-h6" v-if="appStore.activeHour">
          {{ appStore.activeHour.datetime.slice(0, 5) }}
        </h4>
      </nav>
      <sectionHoursList />
    </div>
    <sectionSideBar />
  </div>
</template>

<script setup>
const appStore = useAppStore();
const { saveDataInStore } = useSaveData();

const clientPosition = reactive({
  lat: null,
  long: null,
});

onMounted(async () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      clientPosition.lat = position.coords.latitude;
      clientPosition.long = position.coords.longitude;

      const { data: response } = await useLazyFetch("/api/weather-position", {
        method: "POST",
        body: {
          lat: clientPosition.lat,
          long: clientPosition.long,
        },
      });
      appStore.locationName = "Your Location";
      saveDataInStore(response.value.data.days);
      console.log(appStore.dayInfo);
    });
  } else {
    const { data: response } = await useLazyFetch("/api/weather-default");
    appStore.locationName = response.value.data.address;
    saveDataInStore(response.value.data.days);
  }
});
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 100vh;
}

.navbar-time {
  border-left: 1px solid #ffffff93;
  padding-left: 20px;
}
</style>
