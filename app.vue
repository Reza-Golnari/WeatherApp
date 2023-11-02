<template>
  <div class="w-100">
    <div class="input-box w-100">
      <v-sheet width="300">
        <v-form class="w-100" @submit.prevent>
          <v-text-field
            v-model="cityName"
            label="City name"
            class="w-100"
          ></v-text-field>
          <v-btn type="submit" block class="mt-2">Go</v-btn>
        </v-form>
      </v-sheet>
    </div>
  </div>
</template>

<script setup>
let cityName = ref("");
</script>

<style scoped></style>
