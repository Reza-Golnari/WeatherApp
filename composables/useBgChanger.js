let newImg;
export default function change() {
  function changeBg(status) {
    if (status.includes("rain")) {
      newImg = "url('/images/weather (5).jpg')";
    } else if (status.includes("cloud") || status.includes("overcast")) {
      newImg = "url('/images/weather (3).jpg')";
    } else if (status.includes("clear")) {
      newImg = "url('/images/weather (2).jpg')";
    } else if (status.includes("snow")) {
      newImg = "url('/images/weather (6).jpg')";
    } else {
      newImg = "url('/images/weather (1).jpg')";
    }
    document.documentElement.style.setProperty("--bg", newImg);
  }
  return { changeBg };
}
