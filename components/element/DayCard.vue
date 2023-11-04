<template>
  <div class="day-card d-flex pa-4 rounded-lg">
    <img :src="`/svg/${card.icon}.svg`" />
    <div class="info">
      <p class="date">{{ card.icon }}</p>
    </div>
  </div>
</template>

<script setup>
const { card } = defineProps(["card"]);
</script>

<style scoped>
.day-card {
  width: 280px;
  background-color: rgba(255, 255, 255, 0.15);
}

img {
  width: 40px;
  min-height: 40px;
}
</style>
