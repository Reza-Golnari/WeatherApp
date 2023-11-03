<template>
  <div class="loading my-6 rounded-circle"></div>
</template>

<style scoped>
.loading {
  width: 50px;
  height: 50px;
  border: 2px solid #fff;
  border-right-color: transparent;
  animation: rotation 1.5s forwards infinite;
}

@keyframes rotation {
  to {
    transform: rotate(720deg);
  }
}
</style>
