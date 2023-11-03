<template>
  <div class="container d-flex justify-center align-center">
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
        <h3 class="text-h6 d-flex justify-center my-2">
          {{ appStore.locationName }}
        </h3>
        <ul
          class="details-list mt-3 d-flex align-center justify-space-between w-75 mx-auto"
        >
          <li
            class="details-list__item py-2 px-4 rounded-lg active"
            @click="listActiveHandler"
          >
            5 days
          </li>
          <li
            class="details-list__item py-2 px-4 rounded-lg"
            @click="listActiveHandler"
          >
            14 days
          </li>
        </ul>
      </div>
      <!--------------------- End of details ------------------------------>
      <!--------------------- Start of Days List -------------------------->
      <elementDayCard />
      <!--------------------- End of Days List ---------------------------->
    </div>
  </div>
</template>

<script setup>
const appStore = useAppStore();
const cityName = ref("");
const isShow = ref(false);

function listActiveHandler(event) {
  document.querySelector(".active").classList.remove("active");
  event.target.classList.add("active");
}

async function search() {
  appStore.days = null;
  const { data: response } = await useFetch("/api/weather", {
    method: "POST",
    body: {
      cityName,
    },
  });
  appStore.days = response.value.data.days;
  appStore.locationName = response.value.data.address;
  appStore.tempC = Math.floor(((appStore.days[0].temp - 32) * 5) / 9);

  cityName.value = "";
}
</script>

<style scoped>
.container {
  width: 350px !important;
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

.details-list__item.active {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
