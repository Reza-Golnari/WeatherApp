<template>
  <elementLoading class="mx-auto" v-if="!appStore.dayInfo" />
  <div class="hours-container d-flex justify-start pb-5 px-2" v-else>
    <button class="slider-btn next-btn d-flex align-center" ref="next">
      <IconsNextIcon />
    </button>
    <button class="slider-btn prev-btn d-flex align-center" ref="prev">
      <IconsPrevIcon />
    </button>
    <div class="wrapper d-flex justify-start pt-5" ref="container">
      <elementHourCard
        v-for="(card, index) in appStore.dayInfo.hours"
        :key="index"
        :card="card"
      />
    </div>
  </div>
</template>

<script setup>
const appStore = useAppStore();

const next = ref(null);
const prev = ref(null);
const container = ref(null);

watchEffect(() => {
  if (appStore.dayInfo && next.value && prev.value && container.value) {
    prev.value.addEventListener("click", () => {
      container.value.scrollBy({
        left: -400,
        behavior: "smooth",
      });
    });
    next.value.addEventListener("click", () => {
      container.value.scrollBy({
        left: 400,
        behavior: "smooth",
      });
    });
  }
});
</script>

<style scoped>
.hours-container {
  position: relative;
  width: 100% !important;
  max-width: 100%;
  column-gap: 5px;
  flex-wrap: nowrap;
  direction: rtl;
  overflow: scroll;
}
.wrapper {
  width: 100% !important;
  max-width: 100%;
  column-gap: 5px;
  flex-wrap: nowrap;
  direction: rtl;
  overflow: scroll;
  border-top: 1px solid #ffffff73;
}

.slider-btn {
  position: absolute;
  top: 50%;
  font-size: 2rem;
  z-index: 999;
}

.next-btn {
  right: 0px;
  transform: translateY(-50%);
}
.prev-btn {
  left: 0px;
  transform: translateY(-50%);
}
</style>
