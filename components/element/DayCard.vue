<template>
  <div class="day-card d-flex rounded-lg" @click="setDayInfo">
    <img :src="`/svg/${card.icon}.svg`" />
    <div class="info h-max d-flex flex-column justify-space-between">
      <p class="date">{{ dateString }}</p>
      <p class="status">{{ card.preciptype[0] }}</p>
    </div>
    <div
      class="min-max-box d-flex flex-column justify-space-between align-center ml-auto pr-1"
    >
      <p class="min-temp">{{ Math.floor(((card.tempmin - 32) * 5) / 9) }}°C</p>
      <p class="max-temp">{{ Math.floor(((card.tempmax - 32) * 5) / 9) }}°C</p>
    </div>
  </div>
</template>

<script setup>
const { card } = defineProps(["card"]);
const date = new Date(card.datetime);
const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
};
const dateString = date.toLocaleDateString("en-US", options);
</script>

<style scoped>
.day-card {
  width: 280px;
  background-color: rgba(255, 255, 255, 0.15);
  column-gap: 10px;
  opacity: 0.9;
  border: 1px solid transparent;
  padding: 15px;
  cursor: pointer;
}

.day-card:hover {
  opacity: 1;
}

.day-card.active {
  border-color: #ffffff93;
}

img {
  width: 40px;
  min-height: 40px;
}

.info {
  width: 145px;
  border-right: 1px solid #ffffff93;
}
.date {
  font-size: 0.9rem;
}

.min-max-box {
  /* margin-left: auto; */
  font-size: 0.9rem;
  row-gap: 5px;
}

img,
.date,
.info,
.min-max-box,
.status {
  pointer-events: none;
}
</style>
