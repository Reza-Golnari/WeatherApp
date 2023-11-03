export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const data = await $fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${
      body.cityName
    }?key=${useRuntimeConfig().currentToken}`
  );

  return {
    data,
  };
});
