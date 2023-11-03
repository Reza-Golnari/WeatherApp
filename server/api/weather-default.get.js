export default defineEventHandler(async (event) => {
  const data = await $fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Tehran?key=${
      useRuntimeConfig().currentToken
    }`
  );

  return {
    data,
  };
});
