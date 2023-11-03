export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const data = await $fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${
      body.lat
    },${body.long}?key=${useRuntimeConfig().currentToken}`
  );

  return {
    data,
  };
});
