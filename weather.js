//! Jquery
// jquery popüler bir js kütüphanesidir. Avantajları:Dom işlemleri, animasyon işlemlerinde çok kulllanılıyor

const formJS = document.querySelectorAll("form")[0];
const inputJQ = $(".top-banner input").eq(0);
const msgJQ = $(".top-banner span").eq(0);
const formJquery = jQuery("form").eq(0);
const listJQ = $(".cities").eq(0);
// console.log(formJS);
// console.log(formJquery);
// console.log(inputJQ);
// get(index), eq(index)

// window.onload=()=>{} ==> JS

//addEventListener==>on

$(window).on("load", () => {
  console.log("window.loaded");
});

$(document).ready(() => {
  console.log("DOMContentLoaded");
  localStorage.setItem(
    "apiKey",
    EncryptStringAES(
      "qHxuptpLNG3ry0nVTlXqBFeeSAy4z/idGQyvFEzrj5bn+pbyoHyuArL+hW1ov03F"
    )
  );
});

// formJquery.on("submit", (e) => { 1. kullanım
//   e.preventDefault();
//   getWeatherDataFromApi();
// });

formJquery.submit((e) => {
  // 2. kulllanım
  e.preventDefault();
  getWeatherDataFromApi();
});

const getWeatherDataFromApi = () => {
  console.log("AJAX Func is called");
  const apiKey = DecryptStringAES(localStorage.getItem("apiKey"));
  console.log(apiKey);
  const cityName = inputJQ.val();
  console.log(cityName);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
};

// XMLHTTPREQUEST(xhr) vs. fetch() vs. axios vs. $.ajax //! bu 4 farklı yöntemle api ye veri gönderip çekebiliriz.
