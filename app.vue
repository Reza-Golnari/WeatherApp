<template>
  <div class="container">
    <sectionSideBar />
  </div>
</template>

<script setup>
const appStore = useAppStore();

const clientPosition = reactive({
  lat: null,
  long: null,
});

onMounted(async () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      clientPosition.lat = position.coords.latitude;
      clientPosition.long = position.coords.longitude;

      const { data: response } = await useFetch("/api/weather-position", {
        method: "POST",
        body: {
          lat: clientPosition.lat,
          long: clientPosition.long,
        },
      });
      appStore.days = response.value.data.days;
      appStore.locationName = response.value.data.address;
      appStore.tempC = Math.floor(((appStore.days[0].temp - 32) * 5) / 9);
    });
  } else {
    const { data: response } = await useFetch("/api/weather-default");
    appStore.days = response.value.data.days;
    appStore.locationName = response.value.data.address;
    appStore.tempC = Math.floor(((appStore.days[0].temp - 32) * 5) / 9);
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
</style>
