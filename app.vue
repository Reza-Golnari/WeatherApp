<template>
  <div class="container">
    <sectionSideBar />
  </div>
</template>

<script setup>
// const cityName = ref("");

// const rules = [
//   (value) => !!value || "Please enter a city name",
//   (value) => value.length >= 2 || "The city name must have 2 of more letters",
// ];

// async function search() {
//   if (cityName.value) {
//     await useFetch(
//       `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName.value}?key=PYGC9TLSYBHBDHHH7AKLNKXVM`
//     )
//       .then((res) => {
//         console.log(res.data.value);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
// }
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
