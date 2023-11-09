<template>
  <div class="container d-flex justify-center align-center pr-2">
    <elementLoading v-if="!appStore.days" />
    <div
      class="content-box d-flex flex-column justify-start align-center w-100 h-100"
      v-else
    >
      <!--------------------- Start of Search Input ----------------------->
      <v-card class="mx-auto" color="transparent" width="300" flat>
        <v-card-text>
          <v-text-field
            density="compact"
            variant="solo"
            label="Search templates"
            append-inner-icon="mdi-magnify"
            single-line
            hide-details
            @click:append-inner="search"
            @keypress.enter.prevent="search"
            v-model="cityName"
          ></v-text-field>
        </v-card-text>
      </v-card>
      <!--------------------- End of Search Input ------------------------->
      <!--------------------- Start of details ---------------------------->
      <h2 class="text-h1">{{ appStore.tempC }}°C</h2>
      <h5 class="d-flex align-center justify-center wind">
        <iconsWind />
        <p class="wind-path">Wind Speed :</p>
        <p class="wind-spees">
          {{ appStore.days[0].windspeed }}
        </p>
        km/h
      </h5>
      <span class="divider my-4" />
      <div class="details-container w-75">
        <h3 class="text-h6 text-center">Details Of This Day</h3>
        <h3 class="text-h6 d-flex justify-center my-4">
          {{ appStore.locationName }}
        </h3>
        <ul
          class="details-list mt-6 d-flex align-center justify-space-between w-75 mx-auto"
        >
          <li
            class="details-list__item py-2 px-4 rounded-lg active-item"
            @click="listActiveHandler"
            data-index="5"
          >
            5 days
          </li>
          <li
            class="details-list__item py-2 px-4 rounded-lg"
            @click="listActiveHandler"
            data-index="14"
          >
            14 days
          </li>
        </ul>
      </div>
      <!--------------------- End of details ------------------------------>
      <!--------------------- Start of Days List -------------------------->
      <div class="day-card-container mt-2 pa-2 d-flex flex-column">
        <elementDayCard
          v-for="(card, index) in appStore.days.slice(0, max)"
          :kay="index"
          :card="card"
        />
      </div>
      <!--------------------- End of Days List ---------------------------->
    </div>
  </div>
</template>

<script setup>
const appStore = useAppStore();
const { saveDataInStore } = useSaveData();
const { changeBg } = useBgChanger();
const cityName = ref("");
const max = ref(5);

function listActiveHandler(event) {
  document.querySelector(".active-item").classList.remove("active-item");
  event.target.classList.add("active-item");
  max.value = event.target.dataset.index;
}

async function search() {
  appStore.days = null;
  const { data: response } = await useFetch("/api/weather", {
    method: "POST",
    body: {
      cityName,
    },
  });
  appStore.locationName = response.value.data.address;
  saveDataInStore(response.value.data.days);
  cityName.value = "";
  changeBg(appStore.activeHour.conditions.toLowerCase());
}
</script>

<style scoped>
.container {
  width: clamp(450px, 450px, 450px) !important;
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

.details-list__item {
  cursor: pointer;
  transition: all 0.2s;
}

.details-list__item.active-item {
  background-color: rgba(0, 0, 0, 0.5);
}

.day-card-container {
  height: max-content;
  max-height: 410px;
  overflow-y: scroll;
  row-gap: 10px;
}
</style>
