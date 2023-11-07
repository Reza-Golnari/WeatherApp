<template>
  <div class="container">
    <div
      class="container__left h-100 w-100 d-flex flex-column justify-space-between"
    >
      <nav class="container__left__navbar d-flex justify-end pa-4">
        <h4 class="navbar-date text-h6">{{ dateString }}</h4>
        <h4 class="navbar-time ml-5 text-h6">11:00</h4>
      </nav>
      <footer>hi</footer>
    </div>
    <sectionSideBar />
  </div>
</template>

<script setup>
const appStore = useAppStore();
const dateString = ref("");

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
      appStore.days = response.value.data.days;
      appStore.locationName = "Your Location";
      appStore.tempC = Math.floor(((appStore.days[0].temp - 32) * 5) / 9);
      appStore.dayInfo = appStore.days[0];
      const date = new Date(appStore.dayInfo.datetime);
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      dateString.value = date.toLocaleDateString("en-US", options);
    });
  } else {
    const { data: response } = await useLazyFetch("/api/weather-default");
    appStore.days = response.value.data.days;
    appStore.locationName = response.value.data.address;
    appStore.tempC = Math.floor(((appStore.days[0].temp - 32) * 5) / 9);
    appStore.dayInfo = appStore.days[0];
    const date = new Date(appStore.dayInfo.datetime);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    dateString.value = date.toLocaleDateString("en-US", options);
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
