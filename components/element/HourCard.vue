<template>
  <div class="hour-card d-flex flex-column justify-start align-center border">
    <p>{{ card.datetime.slice(0, 5) }}</p>
    <span class="line w-100 my-2" />
    <img :src="`/svg/${card.icon}.svg`" />
    <p class="temp mt-2">{{ Math.round(((card.temp - 32) * 5) / 9) }}°C</p>
  </div>
</template>

<script setup>
const { card } = defineProps(["card"]);
onMounted(() => {
  console.log(card);
});
</script>

<style scoped>
.hour-card {
  background-color: #ffffff0e;
  backdrop-filter: blur(10px);
  border-radius: 8px;
  cursor: pointer;
  min-width: 100px;
  padding: 10px;
}
.line {
  background-color: #fff;
  height: 2px;
  opacity: 0.5;
}
img {
  width: 40px;
  max-width: 40px;
  min-height: 40px;
  max-height: 40px;
}
</style>
