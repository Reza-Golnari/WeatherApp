<template>
  <div class="w-25 h-100 container d-flex flex-column justify-start">
    <v-card class="mx-auto" color="transparent" width="300" flat>
      <v-card-text>
        <v-text-field
          :loading="loading"
          density="compact"
          variant="solo"
          label="Search templates"
          append-inner-icon="mdi-magnify"
          single-line
          hide-details
          @click:append-inner="onClick"
        ></v-text-field>
      </v-card-text>
    </v-card>
    <h2 class="text-h1">11°C</h2>
    <h5 class="d-flex align-center justify-center wind">
      <iconsWind />
      <p class="wind-path">NorthWest</p>
      ,
      <p class="wind-spees">38.9</p>
      km/h
    </h5>
    <span class="divider" />
  </div>
</template>

<script setup>
const appStore = useAppStore();
</script>

<style scoped>
.container {
  row-gap: 10px;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
}

.divider {
  width: 80%;
  height: 2px;
  background-color: #fff;
  opacity: 0.2;
}

.wind {
  column-gap: 5px;
}
</style>
