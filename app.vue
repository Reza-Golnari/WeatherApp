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
      await useFetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${clientPosition.lat},${clientPosition.long}?key=PYGC9TLSYBHBDHHH7AKLNKXVM`
      ).then((res) => {
        appStore.days = res.data.value.days;
        console.log(appStore.days);
      });
    });
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
