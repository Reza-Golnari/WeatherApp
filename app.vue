<template>
  <div class="container">
    <Head>
      <Title>Weather App</Title>
    </Head>
    <div
      class="container__left h-100 w-75 d-flex flex-column justify-space-between align-end"
    >
      <nav class="container__left__navbar d-flex justify-end pa-4">
        <h4 class="navbar-date text-h6">{{ appStore.dayDate }}</h4>
        <h4 class="navbar-time ml-5 text-h6" v-if="appStore.activeHour">
          {{ appStore.activeHour.datetime.slice(0, 5) }}
        </h4>
      </nav>
      <div class="bottom-box w-100">
        <h2 class="text-h2 big-status" v-if="appStore.activeHour">
          {{ appStore.activeHour.conditions }}
        </h2>
        <sectionHoursList />
      </div>
    </div>
    <sectionSideBar class="sideBar" />
  </div>
</template>

<script setup>
const appStore = useAppStore();
const { saveDataInStore } = useSaveData();
const { changeBg } = useBgChanger();

const clientPosition = reactive({
  lat: null,
  long: null,
});

const images = ref([
  "/images/weather (1).jpg",
  "/images/weather (2).jpg",
  "/images/weather (3).jpg",
  "/images/weather (4).jpg",
  "/images/weather (5).jpg",
  "/images/weather (6).jpg",
]);

function preloadImages() {
  return Promise.all(
    images.value.map((img) => {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = img;
        image.onload = resolve;
        image.onerror = reject;
      });
    })
  );
}
onMounted(async () => {
  await preloadImages();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      clientPosition.lat = position.coords.latitude;
      clientPosition.long = position.coords.longitude;

      const { data: response } = await useLazyFetch("/api/weather-position", {
        method: "POST",
        body: {
          lat: clientPosition.lat,
          long: clientPosition.long,
        },
      });
      appStore.locationName = "Your Location";
      saveDataInStore(response.value.data.days);
      changeBg(appStore.activeHour.conditions.toLowerCase());
    });
  } else {
    const { data: response } = await useLazyFetch("/api/weather-default");
    appStore.locationName = response.value.data.address;
    saveDataInStore(response.value.data.days);
    changeBg(appStore.activeHour.conditions.toLowerCase());
  }
});
</script>

<style>
.container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 100vh;
}

.navbar-time {
  border-left: 1px solid #ffffff93;
  padding-left: 20px;
}

.bottom-box {
  direction: rtl;
}

.big-status {
  font-weight: 500;
  margin-right: 20px;
  color: #ddd;
}

@media screen and (max-width: 950px) {
  .big-status {
    font-size: 3rem !important;
  }
}
@media screen and (max-width: 800px) {
  .big-status {
    font-size: 2.5rem !important;
  }
}
@media screen and (max-width: 700px) {
  .container__left {
    display: none !important;
  }
  .sideBar {
    width: 100vw !important;
  }
}
</style>
