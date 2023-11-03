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
  // await useFetch(
  //   "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London,UK?key=PYGC9TLSYBHBDHHH7AKLNKXVM"
  // ).then((res) => console.log(res));

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      clientPosition.lat = position.coords.latitude;
      clientPosition.long = position.coords.longitude;
      // await useFetch(
      //   `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${clientPosition.lat},${clientPosition.long}?key=PYGC9TLSYBHBDHHH7AKLNKXVM`
      // ).then((res) => {
      //   appStore.days = res.data.value.days;
      //   appStore.locationName = res.data.value.address;
      //   appStore.tempC = Math.floor(((appStore.days[0].temp - 32) * 5) / 9);
      //   console.log(appStore.days[0]);
      // });

      // await useFetch("/api/weather-position", {
      //   method: "post",
      //   body: {
      //     lat: clientPosition.lat,
      //     long: clientPosition.long,
      //   },
      // }).then((res) => {
      //   console.log(res.data.value);
      // });

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
