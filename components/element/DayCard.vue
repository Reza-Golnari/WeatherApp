<template>
  <div class="day-card d-flex pa-4 rounded-lg">
    <img src="~/assets/svgs/clear-day.svg" />
    <div class="info">
      <p class="date"></p>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.day-card {
  width: 280px;
  background-color: rgba(255, 255, 255, 0.15);
}

img {
  width: 40px;
}
</style>
